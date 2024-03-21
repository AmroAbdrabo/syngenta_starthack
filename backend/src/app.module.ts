import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CropsModule } from './crops/crops.module';
import { FarmsModule } from './farms/farms.module';
import { MapsModule } from './maps/maps.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CropsModule, FarmsModule, MapsModule, UsersModule, ProductsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
