// admin-users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';
import { ValidationFailedException } from '@/common/exceptions/validation-failed.exception';
import { ConflictException } from '@/common/exceptions/conflict.exception';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new EntityNotFoundException('User', id);
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hash(data.password, 10);
      return this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw new ConflictException(`Email "${data.email}" is already taken`);
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new EntityNotFoundException('User', id);

    if (data.password) data.password = await hash(data.password, 10);

    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.prisma.user.delete({ where: { id } });
    if (!userToDelete) throw new EntityNotFoundException('User', id);
  }
}
