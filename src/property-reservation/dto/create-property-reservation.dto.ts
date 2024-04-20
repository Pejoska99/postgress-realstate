import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePropertyReservationDto {
    
    @IsNumber()
    readonly propertyId: number;

    @IsNumber()
    readonly customerId: number;

    @IsDateString()
    readonly startDate: Date;
  
    @IsDateString()
    readonly endDate: Date;

    @IsString()
    status: string




}
