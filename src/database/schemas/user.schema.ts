import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_GENDER, USER_STATUS } from '../../common/enums/user.enum';
import bcrypt from 'bcrypt';

class Social {
  @Prop({ type: String, required: false, trim: true })
  facebook: string;

  @Prop({ type: String, required: false, trim: true })
  zalo: string;

  @Prop({ type: String, required: false, trim: true })
  telegram: string;

  @Prop({ type: String, required: false, trim: true })
  twitter: string;

  @Prop({ type: String, required: false, trim: true })
  instagram: string;

  @Prop({ type: String, required: false, trim: true })
  tiktok: string;
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class User {
  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    select: false,
    trim: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: /^\+?[0-9]{7,15}$/,
  })
  phone: string;

  @Prop({
    required: true,
    trim: true,
  })
  fullName: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    default: [],
  })
  roles?: string[];

  @Prop({ default: USER_STATUS.ACTIVE, enum: USER_STATUS })
  status: string;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ required: true, enum: USER_GENDER, default: USER_GENDER.OTHER })
  gender: string;

  @Prop({ select: false })
  refreshToken?: string;

  @Prop({ required: false })
  social: Social;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt();
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
    return next();
  } catch (err) {
    return next(err);
  }
});
