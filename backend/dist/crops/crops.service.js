"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let CropsService = class CropsService {
    constructor(httpService) {
        this.httpService = httpService;
        this.crops = [];
    }
    async getForecastMetadata(authHeader) {
        const url = 'https://services.cehub.syngenta-ais.com/api/Forecast/Metadata';
        const headers = {
            accept: '*/*',
            ApiKey: authHeader,
        };
        try {
            const response = await this.httpService.get(url, { headers }).toPromise();
            return response.data;
        }
        catch (error) {
            throw new Error('Failed to fetch forecast metadata');
        }
    }
    async create(createCropDto) {
        const newCrop = {
            id: (this.crops.length + 1).toString(),
            ...createCropDto,
        };
        this.crops.push(newCrop);
        return newCrop;
    }
    async findAll() {
        return this.crops;
    }
    async findOne(id) {
        const crop = this.crops.find(crop => crop.id === id);
        if (!crop) {
            throw new common_1.NotFoundException(`Crop with ID ${id} not found`);
        }
        return crop;
    }
    async update(id, updateCropDto) {
        const index = this.crops.findIndex(crop => crop.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Crop with ID ${id} not found`);
        }
        const updatedCrop = { ...this.crops[index], ...updateCropDto };
        this.crops[index] = updatedCrop;
        return updatedCrop;
    }
    async remove(id) {
        const index = this.crops.findIndex(crop => crop.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Crop with ID ${id} not found`);
        }
        const removedCrop = this.crops.splice(index, 1)[0];
        return removedCrop;
    }
};
exports.CropsService = CropsService;
exports.CropsService = CropsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CropsService);
//# sourceMappingURL=crops.service.js.map