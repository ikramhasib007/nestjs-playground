import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
// import mongooseAutoPopulate from 'mongoose-autopopulate';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: Cat.name,
    //     schema: CatSchema,
    //   },
    // ]),
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        useFactory: () => {
          const schema = CatSchema;
          // schema.plugin(mongooseAutoPopulate); // plugin
          schema.pre('save', function () {
            console.log('Hello from [pre] save');
          });
          schema.post('save', function () {
            console.log('Hello from [post] save');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class CatsModule {}
