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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlikePost = exports.GetPostLikes = exports.LikePost = exports.GetPostsByUserId = exports.updatePostUsernames = exports.DeletePost = exports.CreatePost = exports.GetPostById = exports.GetPosts = void 0;
var post_1 = require("../models/post");
function GetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.find()];
                case 1:
                    posts = _a.sent();
                    // const testPosts = [{test: "test", picture: null}];
                    return [2 /*return*/, posts];
            }
        });
    });
}
exports.GetPosts = GetPosts;
function GetPostById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(id)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.GetPostById = GetPostById;
function CreatePost(data) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("tuka db", data);
                    return [4 /*yield*/, post_1.Post.create(data).catch(function (error) {
                            console.log("error", error);
                            return null;
                        })];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.CreatePost = CreatePost;
function DeletePost(id) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findByIdAndDelete(id)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.DeletePost = DeletePost;
function updatePostUsernames(userId, newUsername) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, post_1.Post.updateMany({ userId: userId }, { $set: { username: newUsername } })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    console.error("An error occurred:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updatePostUsernames = updatePostUsernames;
function GetPostsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.find({ userId: userId })];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, posts];
            }
        });
    });
}
exports.GetPostsByUserId = GetPostsByUserId;
function LikePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(postId)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        return [2 /*return*/, null];
                    }
                    post.likes.push(userId);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.LikePost = LikePost;
function GetPostLikes(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(postId)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, post.likes];
            }
        });
    });
}
exports.GetPostLikes = GetPostLikes;
function UnlikePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_1.Post.findById(postId)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        return [2 /*return*/, null];
                    }
                    post.likes = post.likes.filter(function (like) { return like !== userId; });
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.UnlikePost = UnlikePost;
