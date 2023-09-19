import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: "Please enter correct email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
