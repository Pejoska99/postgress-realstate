import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    readonly price: number;
   
    @IsNotEmpty()
    @IsString()
    readonly type: string

    @IsString()
    @MinLength(2)
    readonly location: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly description: string

    @IsNumber()
    readonly agentId: number

}
