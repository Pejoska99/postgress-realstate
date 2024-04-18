import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';


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


  @Get()
  findAll():Promise<Property[]> {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Property>{
    return this.propertyService.findOne(+id);
  }
  @Get('/name/:name')
  async getByName(@Param('name') name: string) {
    return this.propertyService.findByName(name);
  }
 
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto):Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto):Promise<Property> {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
