"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegisterResponseDto = exports.RegisterResponseDto = exports.createLoginResponseDto = exports.LoginResponseDto = void 0;
const class_validator_1 = require("class-validator");
class LoginResponseDto {
    message;
    jwtToken;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], LoginResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], LoginResponseDto.prototype, "jwtToken", void 0);
exports.LoginResponseDto = LoginResponseDto;
/**
 * Creates a LoginResponseDto object.
 * @param message
 * @param jwtToken
 * @returns {LoginResponseDto}
 */
const createLoginResponseDto = (message, jwtToken) => {
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto.message = message;
    loginResponseDto.jwtToken = jwtToken;
    return loginResponseDto;
};
exports.createLoginResponseDto = createLoginResponseDto;
class RegisterResponseDto {
    message;
    user;
    jwtToken;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], RegisterResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], RegisterResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], RegisterResponseDto.prototype, "jwtToken", void 0);
exports.RegisterResponseDto = RegisterResponseDto;
/**
 * Creates a RegisterResponseDto object.
 * @param message
 * @param user
 * @param jwtToken
 * @returns {RegisterResponseDto}
 */
const createRegisterResponseDto = (message, user, jwtToken) => {
    const registerResponseDto = new RegisterResponseDto();
    registerResponseDto.message = message;
    registerResponseDto.user = user;
    registerResponseDto.jwtToken = jwtToken;
    return registerResponseDto;
};
exports.createRegisterResponseDto = createRegisterResponseDto;
