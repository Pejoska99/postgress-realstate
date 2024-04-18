import { IsNumber } from "class-validator";
import { CreateAgentDto } from "./create-agent.dto";

export class AgentDto extends CreateAgentDto {
    @IsNumber()
    readonly id: number;
}