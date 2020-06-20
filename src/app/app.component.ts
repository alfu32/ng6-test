import { Component } from '@angular/core';
import { ListService } from './list.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  TodoControllerService,
  TodoWithRelations,
  TodoList,
  TodoListControllerService,
  TodoListWithRelations,
  TodoTodoListControllerService,
  TodoListTodoControllerService,
  Todo,
  NewTodoList,
  NewTodoInTodoList,
  LoopbackCount,
  User,
  UserControllerService,
  UserTodoListControllerService,
} from '../external/todos-api.external.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6-app';

  data: {
    userDetails: User;
  } = {
      userDetails: null,
    };
  constructor(
  ) {
  }
}
