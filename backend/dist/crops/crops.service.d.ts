import { CreateCropDto, UpdateCropDto } from '../dto/dto';
import { Crop } from '../interfaces/interfaces';
import { HttpService } from '@nestjs/axios';
export declare class CropsService {
    private httpService;
    private crops;
    constructor(httpService: HttpService);
    getForecastMetadata(authHeader: string): Promise<any>;
    create(createCropDto: CreateCropDto): Promise<Crop>;
    findAll(): Promise<Crop[]>;
    findOne(id: string): Promise<Crop>;
    update(id: string, updateCropDto: UpdateCropDto): Promise<Crop>;
    remove(id: string): Promise<Crop>;
}
