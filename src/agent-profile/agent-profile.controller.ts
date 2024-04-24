import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentProfileService } from './agent-profile.service';
import { CreateAgentProfileDto } from './dto/create-agent-profile.dto';
import { UpdateAgentProfileDto } from './dto/update-agent-profile.dto';

@Controller('agent-profile')
export class AgentProfileController {
  constructor(private readonly agentProfileService: AgentProfileService) {}


  @Get()
  findAll() {
    return this.agentProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentProfileService.findOne(+id);
  }

  @Post()
  create(@Body() createAgentProfileDto: CreateAgentProfileDto) {
    return this.agentProfileService.create(createAgentProfileDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentProfileDto: UpdateAgentProfileDto) {
    return this.agentProfileService.update(+id, updateAgentProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentProfileService.remove(+id);
  }
}
