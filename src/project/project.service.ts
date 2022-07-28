import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectNotFoundException } from './exceptions/projectNotFound.exception';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {
    const { name, type, clientId } = createProjectDto;
    try {
      return this.prismaService.project.create({
        data: {
          name,
          type,
          client: {
            connect: {
              id: clientId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new ProjectNotFoundException(id);
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prismaService.project.update({
        data: {
          ...updateProjectDto,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProjectNotFoundException(id);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.project.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProjectNotFoundException(id);
      }
      throw error;
    }
  }
}
