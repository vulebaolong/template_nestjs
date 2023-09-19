import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

export interface I_authRes {
    type: string;
    name: string;
    email: string;
    token: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto): Promise<I_authRes> {
        const { name, email, password, type } = registerDto;

        const userExit = await this.userModel.findOne({ email: email });

        if (userExit) {
            throw new ConflictException("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            type,
            name,
            email,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        const userObject = user.toObject();

        delete userObject.password;

        return {
            ...userObject,
            token,
        };
    }

    async login(loginDto: LoginDto): Promise<I_authRes> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const token = this.jwtService.sign({ id: user._id });

        const userObject = user.toObject();

        delete userObject.password;

        return {
            ...userObject,
            token,
        };
    }
}
