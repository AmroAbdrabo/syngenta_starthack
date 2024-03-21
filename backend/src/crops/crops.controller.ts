    import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, } from '@nestjs/common';
    import { CreateCropDto, UpdateCropDto } from '../dto/dto';
    import { CropsService } from './crops.service';
    import { Crop } from '../interfaces/interfaces';

    @Controller('crops')
    export class CropsController {
    constructor(private readonly cropsService: CropsService) {}

    @Post()
    create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
        return this.cropsService.create(createCropDto);
    }

    @Get('metadata')
    async getForecastMetadata(): Promise<any> {
      const authHeader = 'f110df65-176c-4f54-aa0d-07c784d0f52a'; // Replace this with your actual auth header
      try {
        return await this.cropsService.getForecastMetadata(authHeader);
      } catch (error) {
        throw new NotFoundException('Failed to fetch forecast metadata');
      }
    }
  

    @Get('recommendation')
    async getSprayWindowRecommendation(): Promise<any> {
      return this.cropsService.getSprayWindowRecommendation();
    }

    @Get('planting')
    async getPlantingWindowRecommendation(): Promise<any> {
      return this.cropsService.getPlantingWindowRecommendation();
    }
    }

    

