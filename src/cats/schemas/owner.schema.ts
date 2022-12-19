import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type OwnerDocument = Mongoose.HydratedDocument<Owner>;

@Schema()
export class Owner {
  @Prop({ type: Mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
