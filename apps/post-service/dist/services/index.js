"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlikePost = exports.GetPostLikes = exports.LikePost = exports.updatePostUsernames = exports.GetPostsByUserId = exports.DeletePosts = exports.CreatePost = exports.GetPostById = exports.GetPosts = void 0;
var db = __importStar(require("../repositories/index"));
var client_s3_1 = require("@aws-sdk/client-s3");
var dotenv_1 = __importDefault(require("dotenv"));
var sharp_1 = __importDefault(require("sharp"));
dotenv_1.default.config();
var bucketName = process.env.S3_BUCKET_NAME;
var region = process.env.S3_BUCKET_REGION;
var accessKeyId = process.env.S3_ACCESS_KEY;
var secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
console.log(bucketName, region, accessKeyId, secretAccessKey);
var s3 = new client_s3_1.S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
function GetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.GetPosts()];
                case 1:
                    posts = _a.sent();
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
function CreatePost(data, file) {
    return __awaiter(this, void 0, void 0, function () {
        var imageName, now, resizedBuffer, buffer, params, command, postData, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    if (!file) return [3 /*break*/, 4];
                    imageName = "".concat(now.toISOString(), "-").concat(file.originalname);
                    return [4 /*yield*/, (0, sharp_1.default)(file.buffer).toBuffer()];
                case 1:
                    resizedBuffer = _a.sent();
                    return [4 /*yield*/, (0, sharp_1.default)(resizedBuffer).jpeg({ quality: 50 }).toBuffer()];
                case 2:
                    buffer = _a.sent();
                    params = {
                        Bucket: bucketName,
                        Key: imageName,
                        Body: buffer,
                        ContentType: file.mimetype,
                    };
                    command = new client_s3_1.PutObjectCommand(params);
                    return [4 /*yield*/, s3.send(command)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    postData = __assign(__assign({}, data), { picture: imageName || null });
                    console.log("tuka service", postData, file);
                    return [4 /*yield*/, db.CreatePost(postData)];
                case 5:
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
function GetPostsByUserId(userId) {
    var posts = db.GetPostsByUserId(userId);
    return posts;
}
exports.GetPostsByUserId = GetPostsByUserId;
function updatePostUsernames(userId, newUsername) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.updatePostUsernames(userId, newUsername)];
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
function LikePost(postId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.LikePost(postId, userId)];
                case 1:
                    post = _a.sent();
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
                case 0: return [4 /*yield*/, db.GetPostLikes(postId)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
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
                case 0: return [4 /*yield*/, db.UnlikePost(postId, userId)];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    });
}
exports.UnlikePost = UnlikePost;
