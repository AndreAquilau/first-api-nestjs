import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskService } from './controllers/tasks/shared/task.service';
import { TasksModule } from './controllers/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TaskService],
})
export class AppModule {}
