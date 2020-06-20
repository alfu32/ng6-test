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
} from '../external/todos-api.external.module';

export interface TodoListComposite {
  list: TodoListWithRelations;
  todos: Array<Todo>;
  todosCount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6-app';
  inName = 'list';
  inSearch = 'list';
  data: {
    newListName: string;
    newItemName: string;
    newItemDueDate: Date;
    searchTerm: string;
    selectedList: TodoListComposite;
    selectedItem: Todo;
  } = {
    newListName: 'L',
    newItemName: 'x',
    newItemDueDate: new Date(),
    searchTerm: 'x',
    selectedList: null,
    selectedItem: null,
  };
  controls = {
    createListModal: false,
    createItemModal: false,
    editItemModal: false,
    editListFlags: false,
    editTodosFlags: false,
  };
  statuses = new Array<string>();
  lists: Array<TodoListComposite> = [];
  constructor(
    public service: ListService,
    public todosService: TodoControllerService,
    public todoListTodoService: TodoListTodoControllerService,
    public todoListsService: TodoListControllerService,
  ) {
    this.todosService.todoControllerStatuses().subscribe(
      r => {
        this.statuses = r;
      }
    )
    this.todoListsService.todoListControllerFind()
    .subscribe( (v: TodoListWithRelations[]) => {
        console.log(v);
        v.forEach(
          list => {
            this.todoListTodoService.todoListTodoControllerFind(list.id)
              .subscribe((todos: Todo[]) => {
                list.todos = todos;
              });
            const composite = { list, todos: [], todosCount: 0};

            this.todoListsService.todoControllerCountById(list.id)
              .subscribe((count: LoopbackCount) => {
                composite.todosCount = count.count;
              });
            this.lists.push(composite);
          }
        );
      });
  }
  createList(name) {
    this.todoListsService.todoListControllerCreate({
      title: name,
      userId: 1
    })
    .subscribe(
      (list: TodoList) => {
        console.log(list);
        this.lists.push({ list, todos: [], todosCount: 0 });
      }
    );
  }
  filterList(name) {

  }
  selectList(list: TodoListComposite) {
    this.todoListTodoService.todoListTodoControllerFind(list.list.id)
      .subscribe((todos: Todo[]) => {
        list.todos = todos;
      });
    this.data.selectedList = <TodoListComposite>list;
  }
  deleteList(list) {

  }
  createItem(list, item) {
    this.todoListTodoService.todoListTodoControllerCreate(
      this.data.selectedList.list.id, {
        title: this.data.newItemName,
        status: 'todo',
        dueDate: this.data.newItemDueDate,
      })
      .subscribe(
        (v: Todo) => {
          this.data.selectedList.todos.push(v);
          this.data.selectedList.todosCount++;
        }
      )
    this.service.addNewItem(list.id).pipe(take(1))
    .subscribe( v => {
      this.controls.createItemModal = false;
    });
  }
  editItem(item) {
    this.controls.editItemModal = true;
    this.data.selectedItem = {...item};
    this.data.selectedItem.created = (this.data.selectedItem.created).toISOString().substr(0, 10) as unknown as Date;
    this.data.selectedItem.updated = (this.data.selectedItem.updated).toISOString().substr(0, 10) as unknown as Date;
    this.data.selectedItem.dueDate = (this.data.selectedItem.dueDate).toISOString().substr(0, 10) as unknown as Date;

  }
  new_Date($event) {
    return new Date($event);
  }
  saveItem(item: TodoWithRelations) {
    this.controls.editItemModal = false;
    this.todosService.todoControllerUpdateById(
      item.id, {
      id: item.id,
      title: item.title,
      status: item.status,
      dueDate: new Date(item.dueDate),
      todoListId: item.todoListId,
    }).subscribe(
      r => {
        const found = this.data.selectedList.todos.find( t => t.id === item.id );
        found.title = item.title;
        found.status = item.status;
      },
      err => {
        console.error(err);
      }
    );

  }
  deleteItem(list, item) {

  }
}
