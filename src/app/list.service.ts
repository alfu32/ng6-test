import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListData, ItemData } from './list-item/list-item.data';

let seq=0;
let seq2=0;
let db= [{id:'y',name:'y',items:[]}];

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }
  
  findAllList(): Observable<Array<ListData>>{
    return of(db);
  }
  findList(id: string): Observable<ListData> {
    const listLookup = db.find( l => id === l.id );
    return of(listLookup[0]);
  }
  createList(name?: string): Observable<ListData> {
    const newList = {
      id: `LIST%${seq++}`,
      name: `list number ${seq - 1}`,
      items: new Array<ItemData>(),
    };
    db.push(newList);
    return of(newList);
  }
  
  addToList(listId, item: ItemData){
    
  }
  addNewItem(listId: string): Observable<ListData>{
    const listLookup = db.find( list => listId === list.id );
    if(listLookup ){
      const newItem = {
        id: `ITEM%${seq2++}`,
        name: `item number${seq2 - 1}`,
      };
      listLookup.items.push(newItem);
    }
    return of(listLookup);
  }
  updateList(list: ListData): Observable<ListData>{
    const listLookup = db.find( l => l.id === list.id );
    if(listLookup){
      listLookup.name = list.name;
    }
    return of(listLookup);
  }
}
