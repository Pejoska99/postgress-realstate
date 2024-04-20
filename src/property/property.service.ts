import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { Agent } from 'src/agent/entities/agent.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>
  ){}
  

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: { agent: true}
    });
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

  async findByName(name: string): Promise<Property[]> {
    const query = `SELECT * FROM property WHERE name <= $1`;
    const properties = await this.propertyRepository.query(query, [name]);
    return properties;
  }

  
  // async findByName(name: string): Promise<Property[]> {
  //   return this.propertyRepository
  //     .createQueryBuilder('property')
  //     .where('LOWER(property.name) = LOWER(:name)', { name })
  //     .getMany();
  // }
}
