import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { TasksModule } from './tasks/tasks.module';
// import mongooseAutoPopulate from 'mongoose-autopopulate';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://mongoadmin:${process.env.DATABASE_PASSWORD}@127.0.0.1:27017/ocean-cms-engine?authSource=admin`,
      // {
      //   connectionFactory: (connection) => {
      //     connection.plugin(mongooseAutoPopulate());
      //     return connection;
      //   },
      // },
    ),
    TasksModule,
    CatsModule,
  ],
})
export class AppModule {}
