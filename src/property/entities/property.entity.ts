import { IsNumber } from "class-validator";
import { Agent } from "src/agent/entities/agent.entity";
import { PropertyReservation } from "src/property-reservation/entities/property-reservation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    @IsNumber()
  
    agentId: number


    @ManyToOne(() => Agent, agent => agent.properties,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'agentId' })
    agent: Agent;

    @OneToMany(() => PropertyReservation, reservation => reservation.property)
    reservations: PropertyReservation[]




}
