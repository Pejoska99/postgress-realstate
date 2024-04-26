import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { AgentProfile } from 'src/agent-profile/entities/agent-profile.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Agent, AgentProfile])],

  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
