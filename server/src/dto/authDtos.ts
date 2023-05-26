import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {User} from "../entities/userEntity";

export class LoginResponseDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    jwtToken: string;
}

export const createLoginResponseDto = (message: string, jwtToken: string) => {
    const loginResponseDto = new LoginResponseDto();
    loginResponseDto.message = message;
    loginResponseDto.jwtToken = jwtToken;
    return loginResponseDto;
}

export class RegisterResponseDto {
    @IsString()
    @IsNotEmpty()
    message: string;


    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    jwtToken: string;
}

export const createRegisterResponseDto = (message: string, user: User, jwtToken: string) => {
    const registerResponseDto = new RegisterResponseDto();
    registerResponseDto.message = message;
    registerResponseDto.user = user;
    registerResponseDto.jwtToken = jwtToken;
    return registerResponseDto;
}