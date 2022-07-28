import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { ProcessModule } from './process/process.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, ClientModule, ProjectModule, ProcessModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
