import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Type {
    ADMIN = "admin",
    USER = "user",
}

@Schema({
    timestamps: true,
    collection: "user",
})
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({default: Type.USER})
    type: Type;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
