import { Injectable } from '@nestjs/common';
import { CreateAgentProfileDto } from './dto/create-agent-profile.dto';
import { UpdateAgentProfileDto } from './dto/update-agent-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentProfile } from './entities/agent-profile.entity';
import { Repository } from 'typeorm';
import { agent } from 'supertest';

@Injectable()
export class AgentProfileService {
  constructor(
    @InjectRepository(AgentProfile)
    private agentProfileRepository: Repository<AgentProfile>
  ){}
 

  async findAll(): Promise<AgentProfile[]> {
    return this.agentProfileRepository.find();
  }

  async findOne(id: number): Promise<AgentProfile> {
    return this.agentProfileRepository.findOne( { 
      where: { id },
      relations: { agent:true, 
      
      }
     } );
   
  }

  // async create(createAgentProfileDto: CreateAgentProfileDto): Promise<AgentProfile> {
  //   const newAgentProperties = this.agentProfileRepository.create(createAgentProfileDto)
  //   await this.agentProfileRepository.save(newAgentProperties)
  //   return newAgentProperties

  // }

  async update(id: number, updateAgentProfileDto: UpdateAgentProfileDto): Promise<AgentProfile> {
    let newAgentProperties = await this.agentProfileRepository.findOneBy ({ id });
    newAgentProperties = this.agentProfileRepository.merge(newAgentProperties, updateAgentProfileDto);
   await this.agentProfileRepository.save(newAgentProperties)
    return newAgentProperties
  }

  async remove(id: number): Promise<void> {
   this.agentProfileRepository.delete({ id })
  }

  
}
