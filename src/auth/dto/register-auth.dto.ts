
import { LoginUserDto } from './login-auth.dto';
import { IsEnum } from 'class-validator';
import { Role } from 'src/util/role.enum';

export class RegisterUserDto extends LoginUserDto {
    @IsEnum(Role)
    role: Role = Role.User;
}
