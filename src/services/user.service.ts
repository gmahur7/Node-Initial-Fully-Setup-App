import type { User } from "@prisma/client";

import { HTTP_STATUS } from "@constants/http-status";
import { UserRepository } from "@repositories/user.repository";
import { AppError } from "@utils/app-error";

interface CreateUserInput {
  name: string;
  email: string;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
}

export class UserService {
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError("User with this email already exists", HTTP_STATUS.CONFLICT);
    }

    return this.userRepository.create(input);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return user;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    await this.getUserById(id);

    if (input.email) {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser && existingUser.id !== id) {
        throw new AppError("User with this email already exists", HTTP_STATUS.CONFLICT);
      }
    }

    return this.userRepository.update(id, input);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }
}
