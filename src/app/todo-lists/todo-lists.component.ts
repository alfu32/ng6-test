import { Component, OnInit } from '@angular/core';
import { ListService } from '../service/list.service';
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
} from '../../external/todos-api.external.module';

export interface TodoListComposite {
  list: TodoListWithRelations;
  todos: Array<Todo>;
  todosCount: number;
}

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit {


  static TODO_WARNING_DELAY = 7 * 86400000;
  title = 'ng6-app';
  inName = 'list';
  inSearch = 'list';
  data: {
    userDetails: User;
    newListName: string;
    newItem: Todo;
    searchTerm: string;
    selectedList: TodoListComposite;
    editingList: TodoList;
    selectedItem: Todo;
  } = {
      userDetails: null,
      newListName: 'L',
      newItem: {
        title: '',
        dueDate: new Date()
      },
      searchTerm: 'x',
      selectedList: null,
      editingList: null,
      selectedItem: null,
    };
  controls = {
    createListModal: false,
    createItemModal: false,
    editListModal: false,
    editItemModal: false,
    editTodosFlags: false,
  };
  statuses = new Array<string>();
  lists: Array<TodoListComposite> = [];
  constructor(
    public service: ListService,
    public todosService: TodoControllerService,
    public todoListTodoService: TodoListTodoControllerService,
    public todoListsService: TodoListControllerService,
    public userService: UserControllerService,
    public userTodoListsService: UserTodoListControllerService,
  ) {
    this.todosService.todoControllerStatuses().subscribe(
      r => {
        this.statuses = r;
      }
    );
    if (!this.data.userDetails) {
      this.data.userDetails = {
        id: 1,
        email: 'alferarui@login.com',
        name: 'alfu',
        active: true,
      }
    }
    this.userTodoListsService.userTodoListControllerFind(this.data.userDetails.id)
      // this.todoListsService.todoListControllerFind()
      .subscribe((v: TodoListWithRelations[]) => {
        console.log(v);
        v.forEach(
          list => {
            this.todoListTodoService.todoListTodoControllerFind(list.id)
              .subscribe((todos: Todo[]) => {
                list.todos = todos;
              });
            const composite = { list, todos: [], todosCount: 0 };

            this.todoListsService.todoControllerCountById(list.id)
              .subscribe((count: LoopbackCount) => {
                composite.todosCount = count.count;
              });
            this.lists.push(composite);
          }
        );
      });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
  editList(list: TodoListComposite) {
    console.log('edit list', list);
    this.controls.editListModal = true;
    this.data.editingList = { ...list.list };

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
      r => {
        this.controls.editListModal = false;
        this.data.selectedList.list.title = list.title;
      },
      err => {
        alert('save error');
      }
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
      .subscribe(v => {
        this.controls.createItemModal = false;
      });
  }
  editItem(item) {
    this.controls.editItemModal = true;
    this.data.selectedItem = { ...item };
    this.data.selectedItem.created = new Date(this.data.selectedItem.created);
    this.data.selectedItem.updated = new Date(this.data.selectedItem.updated);
    this.data.selectedItem.dueDate = new Date(this.data.selectedItem.dueDate);

  }
  getDueDate(item: Todo) {
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
        const found = this.data.selectedList.todos.find(t => t.id === item.id);
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
    return (new Date(date).getTime() - new Date().getTime()) < -TodoListsComponent.TODO_WARNING_DELAY;
  }
  cmpNear(date) {
    return Math.abs(new Date(date).getTime() - new Date().getTime()) < TodoListsComponent.TODO_WARNING_DELAY;
  }
  cmpFar(date) {
    return (new Date(date).getTime() - new Date().getTime()) > TodoListsComponent.TODO_WARNING_DELAY;
  }

}
