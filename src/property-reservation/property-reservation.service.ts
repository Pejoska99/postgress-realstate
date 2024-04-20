import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyReservationDto } from './dto/create-property-reservation.dto';
import { UpdatePropertyReservationDto } from './dto/update-property-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyReservation } from './entities/property-reservation.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PropertyReservationService {
  constructor(
    @InjectRepository(PropertyReservation) 
    private reservationRepository: Repository<PropertyReservation>
  ){}
  

  async findAll(): Promise<PropertyReservation[]> {
    return this.reservationRepository.find()
  }

  async findOne(id: number): Promise<PropertyReservation> {
    return this.reservationRepository.findOne({ where: { id } });
  }
  

  async create(createPropertyReservationDto: CreatePropertyReservationDto): Promise<PropertyReservation> {
   const existingReservation = await this.reservationRepository.findOne({ 
     where: {
     propertyId: createPropertyReservationDto.propertyId,
     customerId:createPropertyReservationDto.customerId,
     startDate: createPropertyReservationDto.startDate,
     endDate: createPropertyReservationDto.endDate
   }
   });
   console.log(existingReservation)
   if (existingReservation) {
    
     throw new Error('This property is already reserved for the specified dates.');
   }

  const reservation = this.reservationRepository.create(createPropertyReservationDto); 
  await this.reservationRepository.save(reservation)
  return reservation
 }


  // async update(id: number, updatePropertyReservationDto: UpdatePropertyReservationDto):Promise<PropertyReservation> {
  //   let reservation = await this.reservationRepository.findOneBy({id});
  //   if (!reservation) {
  //     throw new Error(`Property reservation with ID ${id} not found.`);
  //   }
  //   reservation = this.reservationRepository.merge(reservation, updatePropertyReservationDto);
  //   await this.reservationRepository.save(reservation);
  //   return reservation
  // }

  async update(id: number, updatePropertyReservationDto: UpdatePropertyReservationDto): Promise<PropertyReservation> {
  
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        propertyId: updatePropertyReservationDto.propertyId,
        startDate: updatePropertyReservationDto.startDate,
        endDate: updatePropertyReservationDto.endDate,
      }
    });
  
    
    if (existingReservation && existingReservation.id !== id) {
      throw new Error('This property is already reserved for the specified dates.');
    }
  
   
    let reservation = await this.reservationRepository.findOne({ where: { id } })
    if (!reservation) {
      throw new Error(`Property reservation with ID ${id} not found.`);
    }
    reservation = this.reservationRepository.merge(reservation, updatePropertyReservationDto);
    await this.reservationRepository.save(reservation);
    return reservation;
  }

  async remove(id: number):Promise<void> {
   await this.reservationRepository.delete(id)
  }
}
