import { Component, OnInit } from '@angular/core';
import { TodoWithRelations } from 'projects/todos-api/src';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  data: TodoWithRelations = {
    id: 0,
    title: '',
    status: 'todo',
  };
  constructor() { }

  ngOnInit() {
  }

}
