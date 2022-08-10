import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskTimerDto } from './dto/task-timer.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './exceptions/taskNotFound.exception';
@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    const { startTime, endTime, name, comments, processId, projectId } =
      createTaskDto;
    const projectOnProcess = await this.prismaService.projectsOnProcess.create({
      data: {
        process: {
          connect: { id: processId },
        },
        project: {
          connect: { id: projectId },
        },
      },
    });
    const task = await this.prismaService.task.create({
      data: {
        name,
        startTime,
        endTime,
        comments,
        projectsOnProcessProcessId: projectOnProcess.processId,
        projectsOnProcessProjectId: projectOnProcess.projectId,
      },
    });
    return task;
  }

  findAll() {
    return this.prismaService.task.findMany({
      orderBy: { id: 'desc' },
      include: {
        projectsOnProcess: {
          include: { process: true, project: { include: { client: true } } },
        },
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        projectsOnProcess: {
          include: { process: true, project: { include: { client: true } } },
        },
      },
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

  async taskTimer(id: number, taskTimerDto: TaskTimerDto) {
    if (taskTimerDto.startTime) {
      await this.prismaService.task.update({
        where: { id },
        data: { running: true },
      });
    }
    if (taskTimerDto.endTime) {
      const end = new Date(taskTimerDto.endTime);
      const task = await this.findOne(id);
      const difference = Math.abs(end.valueOf() - task.startTime.valueOf());
      // console.log(difference);
      // const days = difference / (24 * 60 * 60 * 1000);
      // const hours = (days % 1) * 24;
      // const minutes = (hours % 1) * 60;
      const totalTime = difference + task.totalTime;
      await this.prismaService.task.update({
        where: { id },
        data: {
          totalTime,
          running: false,
        },
      });
    }
    try {
      return await this.prismaService.task.update({
        where: { id },
        data: {
          ...taskTimerDto,
        },
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
