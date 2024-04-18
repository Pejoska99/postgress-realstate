import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get()
  findAll(): Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<Agent> {
    return this.agentService.findOne(+id);
  }

  @Post()
  create(@Body() createAgentDto: CreateAgentDto):Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto):Promise<Agent> {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agentService.remove(+id);
  }
}
