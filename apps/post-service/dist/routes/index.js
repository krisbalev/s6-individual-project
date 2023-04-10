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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const service = __importStar(require("../services/index"));
const postRouter = () => {
    const router = (0, express_1.Router)();
    // Static routes
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield service.GetPosts();
        if (posts) {
            return res.json(posts);
        }
        else {
            return res.status(404).json({ message: "No posts found" });
        }
    }));
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield service.CreatePost(req.body);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        return res.json(post);
    }));
    // Dynamic routes
    router
        .route("/:id")
        .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield service.GetPostById(req.params.id);
        console.log("post router :", post);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        return res.json(post);
    }))
        .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield service.UpdatePosts(req.params.id, req.body);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        return res.json(post);
    }))
        .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield service.DeletePosts(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        return res.json(post);
    }));
    // Middleware for dynamic routes
    router.param("id", (req, res, next, id) => {
        next();
    });
    return router;
};
exports.postRouter = postRouter;
//# sourceMappingURL=index.js.map