import { Component } from '@angular/core';
import { ListService } from './list.service';
import { ListData, ItemData } from './list-item/list-item.data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6-app';
  inName = "list";
  inSearch = "list";
  data = {
    newListName: 'L',
    newItemName:'x',
    searchTerm:'x',
    selectedList: null,
    selectedItem: null,
  };
  
  lists:Array<ListData> = [{id:'x',name:'x',items:[]}];
  constructor(
    public service: ListService,
  ) {
    const sub = service.findAllList().pipe( take(1) )
    .subscribe( lsts => {
      this.lists = lsts;
      sub.unsubscribe();
    })
  }
  createList(name){
    this.service.createList(name).pipe(take(1))
    .subscribe( v => {
      
    })
  }
  filterList(name){
    
  }
  selectList(list){
    this.data.selectedList=list;
  }
  deleteList(list){
    
  }
  createItem(list, item){
    this.service.addNewItem(list.id).pipe(take(1))
    .subscribe( v => {
      
    });
  }
  deleteItem(list,item){
    
  }
}
