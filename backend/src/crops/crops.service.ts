import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto, UpdateCropDto } from '../dto/dto';
import { Crop } from '../interfaces/interfaces';
import { HttpService } from '@nestjs/axios';

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
