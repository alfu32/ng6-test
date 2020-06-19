import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListService } from './list.service';
import { ApiModule as TodosApiModule, APIS as TODOS_SERVICES } from '../external/todos-api.external.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    TodosApiModule.forRoot(() => ({
      selectHeaderContentType: (s: string[]) => s[0],
      selectHeaderAccept: (s: string[]) => s[0],
      isJsonMime: (s: string) => true
    })),
  ],
  providers: [
    ListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
