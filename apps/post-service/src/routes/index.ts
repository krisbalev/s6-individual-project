import { Router } from "express";
import * as service from "../services/index";

export const postRouter = () => {
  const router = Router();

  // Static routes
  router.get("/", async (req, res) => {
    const posts = await service.GetPosts();
    if (posts) {
      return res.json(posts);
    } else {
      return res.status(404).json({ message: "No posts found" });
    }
  });

  router.post("/", async (req, res) => {
    const post = await service.CreatePost(req.body);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    return res.json(post);
  });

  // Dynamic routes
  router
    .route("/:id")
    .get(async (req, res) => {
      const post = await service.GetPostById(req.params.id);
      console.log("post router :", post);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.json(post);
    })
    .delete(async (req, res) => {
      const post = await service.DeletePosts(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      return res.json(post);
    });

  router.route("/posts/:userId").get(async (req, res) => {
    const posts = await service.GetPostsByUserId(req.params.userId);
    return res.json(posts);
  });

  router.route("/like/:postId/userId/:userId").post(async (req, res) => {
    const post = await service.LikePost(req.params.postId, req.params.userId);
    return res.json(post);
  });

  router.route("/likes/:postId").get(async (req, res) => {
    const post = await service.GetPostLikes(req.params.postId);
    return res.json(post);
  });

  router.route("/unlike/:postId/userId/:userId").post(async (req, res) => {
    const post = await service.UnlikePost(req.params.postId, req.params.userId);
    return res.json(post);
  });

  // Middleware for dynamic routes
  router.param("id", (req, res, next, id) => {
    next();
  });

  return router;
};
