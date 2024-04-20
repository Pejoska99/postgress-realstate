import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyReservationDto } from './create-property-reservation.dto';

export class UpdatePropertyReservationDto extends PartialType(CreatePropertyReservationDto) {}
