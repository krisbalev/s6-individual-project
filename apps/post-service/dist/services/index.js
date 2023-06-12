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
exports.DeletePosts = exports.CreatePost = exports.GetPostById = exports.GetPosts = void 0;
var db = __importStar(require("../repositories/index"));
var index_1 = require("../message-broker/index");
function sendMessageAndGetResponse(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, index_1.connectQueue)()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, index_1.sendData)(data)];
                case 3:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error while sending data:", error_1);
                    return [3 /*break*/, 5];
                case 5: 
                // Close the connection
                return [4 /*yield*/, (0, index_1.closeConnection)()];
                case 6:
                    // Close the connection
                    _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function GetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts, userIds, replyData, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    posts = [{
                            _id: "6485e927cb33e6a21ae62964",
                            title: "asdhnipoadpohad",
                            content: "oabhnsfouabs",
                            userId: "64824368b9c3b2053ce51628"
                        }];
                    userIds = posts.map(function (post) { return post.userId; });
                    return [4 /*yield*/, sendMessageAndGetResponse(userIds)];
                case 1:
                    replyData = _a.sent();
                    data = JSON.parse(replyData);
                    console.log(data, "RESPONSEEEEEEEEEEEEEEEEEEE");
                    // const formattedPosts: {}[] = [];
                    // for (const post of posts) {
                    //   const matchingUser = data.find((user: any) => user.id === post.userId);
                    //   const formattedPost = { title: post.title, content: post.content, username: matchingUser?.username };
                    //   formattedPosts.push(formattedPost);
                    // }  
                    // return formattedPosts;
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
                case 0: return [4 /*yield*/, db.GetPostById(id)];
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
                case 0: return [4 /*yield*/, db.CreatePost(data)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.CreatePost = CreatePost;
function DeletePosts(id) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.DeletePost(id)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.DeletePosts = DeletePosts;
