import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyReservationService } from './property-reservation.service';
import { CreatePropertyReservationDto } from './dto/create-property-reservation.dto';
import { UpdatePropertyReservationDto } from './dto/update-property-reservation.dto';
import { PropertyReservation } from './entities/property-reservation.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('property-reservation')
export class PropertyReservationController {
  constructor(private readonly propertyReservationService: PropertyReservationService) {}

  @ApiOperation({
    summary:
      'Retrieves all property-reservations.',
  })
  @ApiOkResponse({
    type: [PropertyReservation],
    description: 'Properties retrieved successfully',
  })
  @Get()
  findAll() {
    return this.propertyReservationService.findAll();
  }

  @ApiOperation({ summary: 'Retrieves a property-reservation by id' })
  @ApiOkResponse({
    type: PropertyReservation,
    description: 'Retrieves a property-reservation by id successfully',
  })

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.propertyReservationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Creates a property-reservation' })
  @ApiCreatedResponse({
    type: PropertyReservation,
    description: 'Trainer created successfully',
  })

  @Post()
  create(@Body() createPropertyReservationDto: CreatePropertyReservationDto) {
    return this.propertyReservationService.create(createPropertyReservationDto);
  }

  @ApiOperation({ summary: 'Updates a property-reservation by id' })
  @ApiOkResponse({
    type: PropertyReservation,
    description: 'Updated a trainer successfully',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyReservationDto: UpdatePropertyReservationDto){
    return this.propertyReservationService.update(+id, updatePropertyReservationDto);
  }

  @ApiOperation({ summary: 'Deletes a property-reservation by id' })
  @ApiOkResponse({
    description: 'PropertyReservation deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.propertyReservationService.remove(+id);
  }
}
