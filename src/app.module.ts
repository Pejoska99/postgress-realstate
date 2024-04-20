import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './agent/agent.module';
import { PropertyModule } from './property/property.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PropertyReservationModule } from './property-reservation/property-reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
    }),
    
    
    AgentModule, PropertyModule, DatabaseModule, PropertyReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
