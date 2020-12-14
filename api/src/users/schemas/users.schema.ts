import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  role: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
