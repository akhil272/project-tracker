import { NotFoundException } from '@nestjs/common';

export class ProcessNotFoundException extends NotFoundException {
  constructor(processId: number) {
    super(`Process with id ${processId} not found`);
  }
}
