import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyReservationService } from './property-reservation.service';
import { CreatePropertyReservationDto } from './dto/create-property-reservation.dto';
import { UpdatePropertyReservationDto } from './dto/update-property-reservation.dto';
import { PropertyReservation } from './entities/property-reservation.entity';

@Controller('property-reservation')
export class PropertyReservationController {
  constructor(private readonly propertyReservationService: PropertyReservationService) {}

  
  @Get()
  findAll(): Promise<PropertyReservation []> {
    return this.propertyReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PropertyReservation> {
    return this.propertyReservationService.findOne(+id);
  }

  @Post()
  create(@Body() createPropertyReservationDto: CreatePropertyReservationDto):Promise<PropertyReservation> {
    return this.propertyReservationService.create(createPropertyReservationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyReservationDto: UpdatePropertyReservationDto):Promise<PropertyReservation> {
    return this.propertyReservationService.update(+id, updatePropertyReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.propertyReservationService.remove(+id);
  }
}
