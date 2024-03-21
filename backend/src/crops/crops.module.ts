import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule {}
