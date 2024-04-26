import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>
  ){}
  

  async findAll(
    type?: string,
    location?: string,
  ): Promise<Property[]> {
    // return this.propertyRepository.find({
    //   relations: { agent: true, reservations: true}
    // });
    const options = {
      realations: ['agent', 'reservations'],
      where: {},
  }
  if(type) {
    options.where['type'] = type;
  }
  if(location) {
    options.where[' location'] = location;
  }

    return this.propertyRepository.find(options)

  }

  async findOne(id: number): Promise<Property> {
    try {
      return this.propertyRepository.findOneByOrFail({ id });
    } catch (error) {
      if(error.name === 'EntityNotFound') {
        throw new NotFoundException(`Property with ID ${id} not found`);
      }
      throw error;
    }
  }
  

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
   const property= this.propertyRepository.create(createPropertyDto);
   await this.propertyRepository.save(property);
   return property
  }


  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    let property = await this.propertyRepository.findOneBy({ id });
    property = this.propertyRepository.merge(property, updatePropertyDto);
    await this.propertyRepository.save(property);
    return property;
  }

  async remove(id: number): Promise<void>{
    await this.propertyRepository.delete(id)
  }


}
