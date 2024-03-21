import { CreateCropDto, UpdateCropDto } from '../dto/dto';
import { CropsService } from './crops.service';
import { Crop } from '../interfaces/interfaces';
export declare class CropsController {
    private readonly cropsService;
    constructor(cropsService: CropsService);
    create(createCropDto: CreateCropDto): Promise<Crop>;
    getForecastMetadata(): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<Crop>;
    update(id: string, updateCropDto: UpdateCropDto): Promise<Crop>;
    remove(id: string): Promise<Crop>;
}
