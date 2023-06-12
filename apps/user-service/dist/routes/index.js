"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const service = __importStar(require("../services/index"));
const userRouter = () => {
    const router = (0, express_1.Router)();
    // Static routes
    router.get("/", async (req, res) => {
        const users = await service.GetUsers();
        if (users) {
            return res.json(users);
        }
        else {
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
    // Middleware for dynamic routes
    router.param("id", (req, res, next, id) => {
        next();
    });
    return router;
};
exports.userRouter = userRouter;
