import { Property } from "src/property/entities/property.entity";
import { ReservationStatus } from "src/util/reservation-status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyReservation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    propertyId: number

    @Column()
    customerId: number

    @Column({type: 'date'})
    startDate: Date;

    @Column({type: 'date'})
    endDate: Date;

    // @Column({default: 'pending'})
    // status: string

    @Column({ 
        default: 'pending',
        type: 'enum', 
        enum: ReservationStatus })
        status: ReservationStatus;


    @ManyToOne(() => Property, property => property.reservations)
    property: Property
     
}


