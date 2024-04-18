import { Property } from "src/property/entities/property.entity";
import { Agency } from "src/util/agency.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    name: string;

    @Column({length:100})
    email: string;

    @Column({length:20})
    phoneNumber:string;

    @Column({ type: 'enum', enum: Agency })
    agency: Agency;

    @Column()
    propertyId: number;

    @ManyToOne(() => Property, (property) => property.agents)
    @JoinColumn({name:'propertyId'})
    property: Property

}
