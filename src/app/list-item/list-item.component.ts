import { Component, OnInit } from '@angular/core';
import { ItemData } from './list-item.data';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  data: ItemData = {
    id: '',
    name: '',
  };
  constructor() { }

  ngOnInit() {
  }

}
