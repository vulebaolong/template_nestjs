import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string | number>("JWT_EXPIRES"),
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
