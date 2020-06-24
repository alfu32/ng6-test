import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoWithRelations, TodoListWithRelations } from 'projects/todos-api/src';

const seq = 0;
let seq2 = 0;
const db = [];

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  findAllList(): Observable<Array<TodoListWithRelations>> {
    return of(db);
  }
  findList(id: string): Observable<TodoListWithRelations> {
    const listLookup = db.find( l => id === l.id );
    return of(listLookup[0]);
  }
  createList(name?: string): Observable<TodoListWithRelations> {
    const newList = {
      title: `list number ${seq - 1}`,
      todos: new Array<TodoWithRelations>(),
    };
    db.push(newList);
    return of(newList);
  }

  addToList(listId, item: TodoListWithRelations) {

  }
  addNewItem(listId: string): Observable<TodoListWithRelations> {
    const listLookup = db.find( list => listId === list.id );
    if (listLookup ) {
      const newItem = {
        id: seq2++,
        title: `item number${seq2 - 1}`,
      };
      listLookup.items.push(newItem);
    }
    return of(listLookup);
  }
  updateList(list: TodoListWithRelations): Observable<TodoListWithRelations> {
    const listLookup = db.find( l => l.id === list.id );
    if (listLookup) {
      listLookup.name = list.title;
    }
    return of(listLookup);
  }
}
