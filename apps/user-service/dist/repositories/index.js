"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfUserExists = exports.DeleteUser = exports.CreateUser = exports.GetUserById = exports.GetUsers = void 0;
const user_1 = require("../models/user");
async function GetUsers() {
    const users = await user_1.User.find();
    return users;
}
exports.GetUsers = GetUsers;
async function GetUserById(id) {
    const user = await user_1.User.findById(id);
    return user;
}
exports.GetUserById = GetUserById;
async function CreateUser(data) {
    const user = await user_1.User.create(data).catch((error) => {
        console.log(error);
        return null;
    });
    return user;
}
exports.CreateUser = CreateUser;
async function DeleteUser(id) {
    const user = await user_1.User.findByIdAndDelete(id);
    return user;
}
exports.DeleteUser = DeleteUser;
async function CheckIfUserExists(email) {
    if (await user_1.User.findOne({ email: email })) {
        return true;
    }
    return false;
}
exports.CheckIfUserExists = CheckIfUserExists;
