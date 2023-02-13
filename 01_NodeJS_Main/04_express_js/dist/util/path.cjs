"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
console.log('Path: ', path_1.default.dirname(require.main.filename));
console.log('Path: ', path_1.default.dirname(process.mainModule.filename));
module.exports = path_1.default.dirname(require.main.filename);
