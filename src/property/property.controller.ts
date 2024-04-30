import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/util/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Response } from 'express'

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('property')
@ApiBearerAuth()

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
  @Roles(Role.Admin)
  create(@Body() createPropertyDto: CreatePropertyDto):Promise<Property> {
    return this.propertyService.create(createPropertyDto);
  }


  @ApiOperation({ summary: 'Updates a property by id' })
  @ApiOkResponse({
    type: Property,
    description: 'Updated a property successfully',
  })
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto):Promise<Property> {
    return this.propertyService.update(+id, updatePropertyDto);
  }
  

  @ApiOperation({ summary: 'Deletes a property by id' })
  @ApiOkResponse({
    description: 'Property deleted successfully',
  })
  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.propertyService.remove(+id);
      res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Property successfully deleted',
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Failed to remove academy',
      });
    }
  }
}
    // return this.propertyService.remove(+id);
  

