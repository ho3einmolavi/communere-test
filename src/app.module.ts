import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './modules/item.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot('mongodb://localhost/communere', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ItemModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
