import { IsNumber } from "class-validator";
import { CreateAgentProfileDto } from "./create-agent-profile.dto";

export class agentProfile extends CreateAgentProfileDto {
    @IsNumber()
    readonly id: number;
}