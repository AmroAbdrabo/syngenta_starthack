import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto, UpdateCropDto } from '../dto/dto';
import { Crop } from '../interfaces/interfaces';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
@Injectable()
export class CropsService {
  private crops: Crop[] = [];
  constructor(private httpService: HttpService) {}

  async getForecastMetadata(authHeader: string): Promise<any> {
    const url = 'https://services.cehub.syngenta-ais.com/api/Forecast/Metadata';
    const headers = {
      accept: '*/*',
      ApiKey: authHeader,
    };

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast metadata');
    }
  }



  async getSprayWindowRecommendation(): Promise<any> {
    const url = 'https://services.cehub.syngenta-ais.com/api/AgronomicsDecisionRecommendation/SprayWindowRecommendation';
    const wkt = 'point(9.3767 47.4245)';
    const startDate = '2024-03-22';
    const endDate = '2024-03-30';
    const sprayingType = 'sw_groundspraygeneric';
    const format = 'json';
    const apiKey = 'f110df65-176c-4f54-aa0d-07c784d0f52a';
    const headers = {
      accept: '*/*',
      ApiKey: apiKey,
    };

    try {
      const response: AxiosResponse<any> = await this.httpService.get(url, {
        headers,
        params: { wkt, startDate, endDate, sprayingType, format },
      }).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch spray window recommendation');
    }
  }

  async getPlantingWindowRecommendation(): Promise<any> {
    const url = 'https://services.cehub.syngenta-ais.com/api/AgronomicsDecisionRecommendation/PlantingWindowRecommendation';
    const locationAsWKT = 'point(9.3767 47.4245)';
    const startDate = '2024-03-22';
    const endDate = '2024-03-30';
    const cropType = 'PW_Corn_RU';
    const datasetLabel = 'NEMSAUTO';
    const soilType = '1';
    const headers = {
      accept: '*/*',
      ApiKey: 'f110df65-176c-4f54-aa0d-07c784d0f52a',
    };

    try {
      const response: AxiosResponse<any> = await this.httpService.get(url, {
        headers,
        params: { locationAsWKT, startDate, endDate, cropType, datasetLabel, soilType },
      }).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch planting window recommendations');
   
    }
  }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const newCrop: Crop = {
      id: (this.crops.length + 1).toString(),
      ...createCropDto,
    };
    this.crops.push(newCrop);
    return newCrop;
  }

  async findAll(): Promise<Crop[]> {
    return this.crops;
  }

  async findOne(id: string): Promise<Crop> {
    const crop = this.crops.find(crop => crop.id === id);
    if (!crop) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }
    return crop;
  }

  async update(id: string, updateCropDto: UpdateCropDto): Promise<Crop> {
    const index = this.crops.findIndex(crop => crop.id === id);
    if (index === -1) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }
    const updatedCrop = { ...this.crops[index], ...updateCropDto };
    this.crops[index] = updatedCrop;
    return updatedCrop;
  }

  async remove(id: string): Promise<Crop> {
    const index = this.crops.findIndex(crop => crop.id === id);
    if (index === -1) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }
    const removedCrop = this.crops.splice(index, 1)[0];
    return removedCrop;
  }
}
