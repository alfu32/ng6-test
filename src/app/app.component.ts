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
  static TODO_WARNING_DELAY = 7 * 86400000;
  title = 'ng6-app';
  inName = 'list';
  inSearch = 'list';
  data: {
    newListName: string;
    newItem: Todo;
    searchTerm: string;
    selectedList: TodoListComposite;
    selectedItem: Todo;
  } = {
    newListName: 'L',
    newItem: {
      title: '',
      dueDate: new Date()
    },
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
  saveList(list: TodoList) {
    this.todoListsService.todoListControllerUpdateById(
      list.id,
      {
        id: list.id,
        title: list.title,
      }
    ).subscribe(
      r => {},
      err => {}
    )
  }
  deleteList(list) {

  }
  createItem(list, item: Todo) {
    this.todoListTodoService.todoListTodoControllerCreate(
      this.data.selectedList.list.id, {
        title: this.data.newItem.title,
        status: 'todo',
        dueDate: this.data.newItem.dueDate,
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
    this.data.selectedItem.created = new Date(this.data.selectedItem.created);
    this.data.selectedItem.updated = new Date(this.data.selectedItem.updated);
    this.data.selectedItem.dueDate = new Date(this.data.selectedItem.dueDate);

  }
  getDueDate(item: Todo){
    return item.dueDate.toString().substr(0, 10);
  }
  setDueDate(item: Todo, $event) {
    console.log('setDueDate', $event);
    return item.dueDate = new Date($event);
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
        found.dueDate = item.dueDate;
      },
      err => {
        console.error(err);
      }
    );

  }
  deleteItem(list, item) {

  }
  cmpOver(date) {
    return (new Date(date).getTime() - new Date().getTime()) < -AppComponent.TODO_WARNING_DELAY;
  }
  cmpNear(date) {
    return Math.abs(new Date(date).getTime() - new Date().getTime()) < AppComponent.TODO_WARNING_DELAY;
  }
  cmpFar(date) {
    return (new Date(date).getTime() - new Date().getTime()) > AppComponent.TODO_WARNING_DELAY;
  }
}
