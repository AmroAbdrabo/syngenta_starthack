export class CreateCropDto {
    readonly name: string;
    readonly description: string;
    // Add other properties as needed
  }
  
  export class UpdateCropDto {
    readonly name?: string;
    readonly description?: string;
    // Add other properties as needed
  }
  