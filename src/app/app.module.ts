import { BrowserModule,  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListService } from './list.service';
import { ApiModule as TodosApiModule, APIS as TODOS_SERVICES } from '../external/todos-api.external.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component'; 


@NgModule({
   declarations: [
      AppComponent,
      ListItemComponent,
      LoginComponent,
      TodoListsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule,
      FormsModule,
      HttpClientModule,
      ClarityModule,
      TodosApiModule.forRoot(() => ({
         apiKeys: {'myKey': '12345678'},
         username: '',
         password: '',
         accessToken: '',
         basePath: '',
         withCredentials: false,
         selectHeaderContentType(ct: string[]) { return ct[0];},
         selectHeaderAccept(ha: string[]) { return ha[0] || '*/*'; },
         isJsonMime(m: string) { return true; }
      })),
    AppRoutingModule,
  ],
  providers: [
    ListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
