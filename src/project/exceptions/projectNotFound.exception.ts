import { NotFoundException } from '@nestjs/common';

export class ProjectNotFoundException extends NotFoundException {
  constructor(projectId: number) {
    super(`Project with id ${projectId} not found`);
  }
}
