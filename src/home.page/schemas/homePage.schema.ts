import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { bucketRoot, ContentSchema } from './content.schema';

export type HomePageDocument = Mongoose.HydratedDocument<HomePage>;

@Schema({ timestamps: true })
export class HomePage {
  @Prop(
    raw({
      order: { type: Number, default: 0, immutable: true },
      title: { type: String },
      backgroundImageUrl: {
        type: String,
        get: (v: string) => `${bucketRoot}${v}`,
      },
      enlistedEmployees: {
        type: [
          {
            id: { type: Mongoose.Schema.Types.ObjectId },
            title: { type: String },
            employmentStatus: { type: String },
          },
        ],
        default: [],
      },
    }),
  )
  hero: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 1, immutable: true },
      title: { type: String },
      text: { type: String },
      imageUrl: {
        type: String,
        get: (v: string) => `${bucketRoot}${v}`,
      },
    }),
  )
  content: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 2, immutable: true },
      title: { type: String },
      contentLeft: {
        type: ContentSchema,
        default: () => ({}),
      },
      contentRight: {
        type: ContentSchema,
        default: () => ({}),
      },
    }),
  )
  feature: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 3, immutable: true },
      ...ContentSchema,
    }),
  )
  ctaOne: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 4, immutable: true },
      ...ContentSchema,
    }),
  )
  ctaTwo: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 5, immutable: true },
      ...ContentSchema,
    }),
  )
  ctaThree: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 6, immutable: true },
      title: { type: String },
      contentLeft: {
        type: ContentSchema,
        default: () => ({}),
      },
      contentRight: {
        type: ContentSchema,
        default: () => ({}),
      },
    }),
  )
  stats: Record<string, any>;

  @Prop(
    raw({
      order: { type: Number, default: 7, immutable: true },
      ...ContentSchema,
    }),
  )
  ctaFour: Record<string, any>;
}

export const HomePageSchema = SchemaFactory.createForClass(HomePage);
