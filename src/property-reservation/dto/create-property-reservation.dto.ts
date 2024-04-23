import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { ReservationStatus } from "src/util/reservation-status.enum";


export class CreatePropertyReservationDto {
    
    @IsNumber()
    readonly propertyId: number;

    @IsNumber()
    readonly customerId: number;

    @IsDateString()
    readonly startDate: Date;
  
    @IsDateString()
    readonly endDate: Date;

    // @IsString()
    // status: string

    @IsEnum(ReservationStatus)
    readonly agency: ReservationStatus;

   





}
