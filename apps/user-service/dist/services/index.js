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
exports.ChangeUsername = exports.CheckIfUserExists = exports.DeleteUsers = exports.CreateUser = exports.GetUserById = exports.GetUsers = void 0;
const db = __importStar(require("../repositories/index"));
const message_broker_1 = require("../message-broker");
async function GetUsers() {
    const users = await db.GetUsers();
    return users;
}
exports.GetUsers = GetUsers;
async function GetUserById(id) {
    const user = await db.GetUserById(id);
    return user;
}
exports.GetUserById = GetUserById;
async function CreateUser(data) {
    const user = await db.CreateUser(data);
    return user;
}
exports.CreateUser = CreateUser;
async function DeleteUsers(id) {
    const user = await db.DeleteUser(id);
    return user;
}
exports.DeleteUsers = DeleteUsers;
async function CheckIfUserExists(email) {
    const user = await db.CheckIfUserExists(email);
    return user;
}
exports.CheckIfUserExists = CheckIfUserExists;
async function ChangeUsername(userId, newUsername) {
    const user = await db.ChangeUsername(userId, newUsername);
    //Change username in posts through rabbitmq
    const data = {
        userId: userId,
        newUsername: newUsername,
    };
    await (0, message_broker_1.sendData)(data);
    return user;
}
exports.ChangeUsername = ChangeUsername;
