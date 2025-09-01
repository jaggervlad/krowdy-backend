
import { User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserUseCases {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async getUsers(): Promise<User[]> {
    const result = await this.userRepository.getMany();
    return result.getOrElse([]);
  }


  async getUser(id: string): Promise<User | null> {
    const result = await this.userRepository.getOne({ where: { id } });
    const user = result.getOrElse(null);
    return user;
  }


  async createUser(input: CreateUserInput): Promise<User | null> {
    const result = await this.userRepository.createUser(input);
    return result.getOrThrow("Error creating user");
  }


  async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const result = await this.userRepository.updateUser(id, input);
    return result.getOrThrow("Error updating user");
  }


  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.deleteUser(id);
    return result.getOrElse(false);
  }
}