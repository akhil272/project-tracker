import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessNotFoundException } from './exceptions/processNotFound.exception';

@Injectable()
export class ProcessService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProcessDto: CreateProcessDto) {
    try {
      const process = await this.prismaService.process.create({
        data: { ...createProcessDto },
      });
      return process;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.prismaService.process.findMany();
  }

  async findOne(id: number) {
    const process = await this.prismaService.process.findUnique({
      where: { id },
    });
    if (!process) {
      throw new ProcessNotFoundException(id);
    }
    return process;
  }

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    try {
      return await this.prismaService.process.update({
        data: {
          ...updateProcessDto,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProcessNotFoundException(id);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.process.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProcessNotFoundException(id);
      }
      throw error;
    }
  }
}
