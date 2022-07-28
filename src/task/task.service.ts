import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './exceptions/taskNotFound.exception';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    const { startTime, endTime, name, comments } = createTaskDto;
    const task = await this.prismaService.task.create({
      data: {
        name,
        startTime,
        endTime,
        comments,
        process: {
          connect: { id: createTaskDto.processId },
        },
      },
    });
    return task;
  }

  findAll() {
    return this.prismaService.task.findMany({ include: { process: true } });
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prismaService.task.update({
        data: {
          ...updateTaskDto,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new TaskNotFoundException(id);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.task.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new TaskNotFoundException(id);
      }
      throw error;
    }
  }
}
