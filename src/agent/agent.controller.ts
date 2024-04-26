import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';


@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}


  @ApiOperation({
    summary:
    'Retrieves all agents.Optionaly filters the result by name and agancy'
  })

  @ApiOkResponse({
    type: [Agent],
    description: 'Agents retrieved successfully'
  })
  @Get()
  @ApiQuery({
    name: 'name', 
    required: false,
  })

  @ApiQuery({
    name: 'agency',
    required: false,
  })
  findAll(
    @Query('name') name: string,
    @Query('agency') agency: string,
  ){
    return this.agentService.findAll(name, agency);
  }

  @ApiOperation({ summary: 'Retrieves an agent by id' })
  @ApiOkResponse({
    description: 'Retrievs an agent by id successfully',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Creates a agent'})
  @ApiCreatedResponse({
    type: Agent, 
    description: ' Agent created successfully'
  })
  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @ApiOperation({ summary: 'Updates an agent by id' })
  @ApiOkResponse({
    type: Agent,
    description: 'Updated an agent successfully',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @ApiOperation({ summary: 'Deletes an agent by id' })
  @ApiOkResponse({
    description: 'Agent deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }
}
