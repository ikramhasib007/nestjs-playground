import * as Mongoose from 'mongoose';

export const bucketRoot = 'https://s3.amazonaws.com/mybucket';

export type ContentDocument = Mongoose.HydratedDocument<typeof ContentSchema>;

export const ContentSchema = new Mongoose.Schema({
  title: { type: String },
  text: { type: String },
  imageUrl: { type: String, get: (v: string) => `${bucketRoot}${v}` },
  anchor: {
    href: { type: String },
    label: { type: String },
  },
});
