import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
// import { Owner } from './owner.schema';

export type CatDocument = Mongoose.HydratedDocument<Cat>;

@Schema({ timestamps: true })
export class Cat {
  // @Prop({ type: Mongoose.Schema.Types.ObjectId })
  // id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  // @Prop([String])
  // tags: string[];

  // @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'Owner' }) // single owner
  // @Prop({ type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Owner' }] }) // multiple owner
  // owner: Owner;

  // @Prop(
  //   raw({
  //     firstName: { type: String },
  //     lastName: { type: String },
  //   }),
  // ) // a property represents a nested object
  // details: Record<string, any>;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
