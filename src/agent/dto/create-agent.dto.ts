import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsObject, IsString, MinLength, ValidateNested, } from "class-validator";
import { CreateAgentProfileDto } from "src/agent-profile/dto/create-agent-profile.dto";
import { Agency } from "src/util/agency.enum";

export class CreateAgentDto {
    @IsString()
    @MinLength(3)
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly phoneNumber: string;

    @IsEnum(Agency)
    readonly agency: Agency;
    
    @ValidateNested()
    @IsObject()
    @Type(() => CreateAgentProfileDto)
    profile: CreateAgentProfileDto;
  }



