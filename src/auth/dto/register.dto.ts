import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Type } from "../schema/user.schema";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: "Please enter correct email" })
    email: string;

    @IsOptional()
    type: Type;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
