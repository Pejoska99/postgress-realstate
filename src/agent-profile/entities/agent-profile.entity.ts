import { IsNumber} from "class-validator";
import { Agent } from "src/agent/entities/agent.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AgentProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    yearsOfExperience: number;

    @Column()
    specialties: string;

    // @Column()
    // @IsNumber()
    // agentId: number

    // @OneToOne(() => Agent, (agent) => agent.agentProfile)
    // @JoinColumn({name: 'agentId'})
    // agent: Agent;
    @OneToOne(() => Agent, (agent) => agent.profile)
    agent: Agent;

 
  }
    



