import { Router } from "express";
import * as service from "../services/index";
import { GetUsernamesPerId } from "../repositories";

export const userRouter = () => {
  const router = Router();

  // Static routes
  router.get("/", async (req, res) => {
    const users = await service.GetUsers();
    if (users) {
      return res.json(users);
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  });

  router.post("/", async (req, res) => {
    const user = await service.CreateUser(req.body);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json(user);
  });

  // Dynamic routes
  router
    .route("/:id")
    .get(async (req, res) => {
      const user = await service.GetUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.json(user);
    })
    .delete(async (req, res) => {
      const user = await service.DeleteUsers(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.json(user);
    });

  router.route("/check/:email").get(async (req, res) => {
    const userExists = await service.CheckIfUserExists(req.params.email);

    const response = {
      result: userExists,
    };

    return res.json(response);
  });

  router.route("/change-username")
    .post(async (req, res) => {
      const user = await service.ChangeUsername(req.body.id, req.body.newUsername);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.json(user);
    });

  // Middleware for dynamic routes
  router.param("id", (req, res, next, id) => {
    next();
  });

  return router;
};
