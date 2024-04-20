import { Module } from '@nestjs/common';
import { PropertyReservationService } from './property-reservation.service';
import { PropertyReservationController } from './property-reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyReservation } from './entities/property-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyReservation])],
  controllers: [PropertyReservationController],
  providers: [PropertyReservationService],
})
export class PropertyReservationModule {}
