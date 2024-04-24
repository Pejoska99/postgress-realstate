import { Module } from '@nestjs/common';
import { AgentProfileService } from './agent-profile.service';
import { AgentProfileController } from './agent-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentProfile} from './entities/agent-profile.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([AgentProfile])],
  controllers: [AgentProfileController],
  providers: [AgentProfileService],
})
export class AgentProfileModule {}
