import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserForm {
  @IsNotEmpty({ message: 'Name is required'})
  name: string;
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z\d!@#$%^&*()\-_+=]{8,}$/, { message: 'Password must contain at least 8 characters, one letter, one number and one special character' })
  password: string;
}