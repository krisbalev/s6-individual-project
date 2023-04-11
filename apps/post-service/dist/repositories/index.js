"use strict";
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
exports.DeletePost = exports.UpdatePost = exports.CreatePost = exports.GetPostById = exports.GetPosts = void 0;
const database_1 = require("database");
const prisma = new database_1.PrismaClient();
function GetPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield prisma.post.findMany();
        return posts;
    });
}
exports.GetPosts = GetPosts;
function GetPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post
            .findUnique({
            where: {
                id: id,
            },
        })
            .catch(() => {
            return null;
        });
        return post;
    });
}
exports.GetPostById = GetPostById;
function CreatePost(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post
            .create({
            data: data,
        })
            .catch(() => {
            return null;
        });
        return post;
    });
}
exports.CreatePost = CreatePost;
function UpdatePost(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post
            .update({
            where: {
                id: id,
            },
            data: data,
        })
            .catch(() => {
            return null;
        });
        return post;
    });
}
exports.UpdatePost = UpdatePost;
function DeletePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.post
            .delete({
            where: {
                id: id,
            },
        })
            .catch(() => {
            return null;
        });
        return post;
    });
}
exports.DeletePost = DeletePost;
//# sourceMappingURL=index.js.map