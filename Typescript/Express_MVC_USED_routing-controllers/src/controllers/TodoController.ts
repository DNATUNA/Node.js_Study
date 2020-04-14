import {
  Controller,
  Get,
  Post,
  Param,
  Params,
  QueryParam,
} from 'routing-controllers';
import 'reflect-metadata';

@Controller('/todos')
export class TodoController {
  @Get()
  public index() {
    return [
      {
        id: 1,
        title: 'todo item!',
        description: 'must do blahblah!',
      },
    ];
  }

  @Post()
  public create() {
    return [
      {
        id: 1,
        title: 'todo item!',
        description: 'must do blablal',
      },
    ];
  }

  @Get('/:todo')
  public getId(@QueryParam('todo') todoId: number) {
    return [
      {
        id: todoId,
        title: 'todo item!',
        description: 'must do blahblah!',
      },
    ];
  }
}
