import { NotFoundException } from '@nestjs/common';

export class ClientNotFoundException extends NotFoundException {
  constructor(clientId: number) {
    super(`Client with id ${clientId} not found`);
  }
}
