import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';


@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiOperation({
    summary:
    'Retrieves all properties. Optionaly filters result by type or location'
  })

  @ApiOkResponse({
    type: [Property],
    description: 'Properties retrieves successfully',
  })


  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
  })

  @ApiQuery({
    name: 'location',
    required: false,
  })
  findAll(
    @Query('type') type: string,
    @Query('location') location: string,
  ) {
    return this.propertyService.findAll(type, location);
  }

  @ApiOperation({ summary: 'Retrives a property by id' })
  @ApiOkResponse({
    description: 'retrives a property by id successfully',
  })

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.propertyService.findOne(+id);
  }
 

  @ApiOperation({ summary: 'Create  a property' })
  @ApiCreatedResponse({
    type: Property,
    description: 'Property created successfully',
  })
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto):Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }


  @ApiOperation({ summary: 'Updates a property by id' })
  @ApiOkResponse({
    type: Property,
    description: 'Updated a property successfully',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto):Promise<Property> {
    return this.propertyService.update(+id, updatePropertyDto);
  }
  

  @ApiOperation({ summary: 'Deletes a property by id' })
  @ApiOkResponse({
    description: 'Property deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
