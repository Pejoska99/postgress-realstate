import { IsEnum, IsNumber, IsString, MinLength } from "class-validator";
import { Agency } from "src/util/agency.enum";

export class CreateAgentDto {
    @IsString()
    @MinLength(3)
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsNumber()
    readonly phonenumber: number;

    @IsEnum(Agency)
    readonly agency: Agency;


}