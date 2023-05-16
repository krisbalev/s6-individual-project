import { Router } from "express";
import * as service from "../services/index";

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
  })

  // Dynamic routes
  router
    .route("/:id")
    .get(async (req, res) => {
      const user = await service.GetUserById(req.params.id);
      console.log("user router :", user);
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

  // Middleware for dynamic routes
  router.param("id", (req, res, next, id) => {
    next();
  });

  return router;
};
