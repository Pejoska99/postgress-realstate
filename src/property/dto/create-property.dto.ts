import { IsInt, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreatePropertyDto {
    
    @IsString()
    readonly name: string;

    @IsInt()
    @Min(0)
    readonly price: number;

    @IsString()
    @MinLength(2)
    readonly location: string

    @IsString()
    @MinLength(2)
    readonly description: string

    @IsNumber()
    readonly agentId: number

}
