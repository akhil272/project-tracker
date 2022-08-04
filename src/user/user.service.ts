import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    const user = this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });
    return user;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return updateUser;
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
