
import { AgentProfile } from "src/agent-profile/entities/agent-profile.entity";
import { Property } from "src/property/entities/property.entity";
import { Agency } from "src/util/agency.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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


    @OneToMany(() => Property, (property) => property.agent, { cascade: true })
  properties: Property[];

  @OneToOne(() => AgentProfile, (profile) => profile.agent, { cascade: true })
  @JoinColumn()
  profile: AgentProfile;
   
    

}
