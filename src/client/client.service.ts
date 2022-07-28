import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaError } from 'src/utils/prismaError';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientNotFoundException } from './exceptions/clientNotFound.exception';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    try {
      const address = createClientDto.address;
      return await this.prismaService.client.create({
        data: {
          ...createClientDto,
          address: { create: address },
        },
        include: {
          address: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.prismaService.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prismaService.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new ClientNotFoundException(id);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      return await this.prismaService.client.update({
        data: {
          ...updateClientDto,
          id: undefined,
        },
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ClientNotFoundException(id);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.client.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ClientNotFoundException(id);
      }
      throw error;
    }
  }
}
