### First API-REST NestJS

#### add files options
>.editorconfig
```.editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

> .vscode/settings.json
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

> .eslint.js
```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

> .prettierrc.js
```js
module.exports = {
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80
}
```
> .eslintignore
> .prettierignore

#### Install NestJS CLI
```bash
yarn add --global @nestjs/cli
```
```bash
npm install --global @nestjs/cli
```

#### Create new project
```bash
nest new name-project
```
```bash
nest n name-project
```

### Nest Generate
```bash
nest generate <option> name
```
```bash
nest g <option> name
```

#### Nest Generate Controller
No NestJS em um contrller é criado a rota e os verbos tudo em uma única Classe.
```bash
nest generate controller controllers/tasks
```
> cast.controller.ts
```ts
import { Controller, Get } from '@nestjs/common';

//Para o decorator @controller passamos a rota na ipa
@Controller('cats')
export class CatsController {

  //Verbos aceitos pela API na rota cats
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

#### Nest Generate Provider
No NestJS as recras de negócios não ficão no controllers, fica em um arquivo de service.<br>
Normalmente salvamos esses arquivos em uma pasta dentro do controller chamada shared.
> exmplo.service.ts
```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```
```bash
nest generate provider controllers/tasks/shared/tasks.service
```
#### Nest Generate Class
```bash
nest generate class controllers/tasks/shared/task
```

#### Nest Generate Module
No NestJS um module é aonde são agrupados os providers e os controlles e depois, <br>
exportado esse module para o module global da aplicação, assim deixando mais <br>
organizado o código.
>cats.module.ts
```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```
O module é criado na pasta raiz do controller
```bash
nest generate module controllers/tasks
```
#### NestJS Imports Modules
Importando os modules dos controllers para a aplicação.<br>
Assim o código fica mais limpo.
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TaskService } from './controllers/tasks/share/task.service';
import { TasksModule } from './controllers/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TaskService],
})
export class AppModule {}
```
#### CRUD Basi
> task.ts
```ts
export class Task {
  id: number;
  description: string;
  completed: boolean;
}
```
> task.service.ts
```ts
import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, description: 'Tarefa1', completed: false },
    { id: 2, description: 'Tarefa2', completed: false },
    { id: 3, description: 'Tarefa3', completed: false },
    { id: 4, description: 'Tarefa4', completed: false },
    { id: 5, description: 'Tarefa5', completed: false },
    { id: 6, description: 'Tarefa6', completed: false },
    { id: 7, description: 'Tarefa7', completed: false },
    { id: 8, description: 'Tarefa8', completed: false },
    { id: 9, description: 'Tarefa9', completed: false },
    { id: 10, description: 'Tarefa10', completed: false },
  ];

  getAll() {
    return this.tasks;
  }
  getById(id: number) {
    const task = this.tasks.find((value) => value.id == id);

    return task;
  }
  create(task: Task) {
    let lastId = 0;
    if (this.tasks.length > 0) {
      lastId = this.tasks[this.tasks.length - 1].id;
    }
    task.id = lastId + 1;

    this.tasks.push(task);

    return task;
  }
  update(task: Task) {
    const taskArray = this.getById(task.id);
    if (taskArray) {
      taskArray.completed = task.completed;
      taskArray.description = task.description;
    }
    return taskArray;
  }
  delete(id: number) {
    const taskArray = this.getById(id);
    if (taskArray) {
      const index = this.tasks.findIndex((value) => value.id === id);
      this.tasks.slice(index, 1);
      return true;
    }
    return false;
  }
}
```
> tasks.controller.ts
```ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  // localhost:3000/tasks
  @Get()
  async getAll(): Promise<Task[]> {
    const tasks = await this.taskService.getAll();
    return tasks;
  }
  // localhost:3000/tasks/1
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.getById(id);
    return task;
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    const response = await this.taskService.create(task);
    return task;
  }

  @Put(':id')
  async update(@Param() id: number, @Body() task: Task): Promise<Task> {
    task.id = id;
    const response = await this.taskService.update(task);

    return task;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.taskService.delete(id);
  }
}
```
