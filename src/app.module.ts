import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { ProcessModule } from './process/process.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [PrismaModule, ClientModule, ProjectModule, ProcessModule, TaskModule, UserModule, TeamModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
