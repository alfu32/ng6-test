import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { TodoControllerService } from './api/todoController.service';
import { TodoListControllerService } from './api/todoListController.service';
import { TodoListTodoControllerService } from './api/todoListTodoController.service';
import { TodoListUserControllerService } from './api/todoListUserController.service';
import { TodoTodoListControllerService } from './api/todoTodoListController.service';
import { UserControllerService } from './api/userController.service';
import { UserTodoListControllerService } from './api/userTodoListController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [
      HttpClientModule,
  ],
  providers: [
    TodoControllerService,
    TodoListControllerService,
    TodoListTodoControllerService,
    TodoListUserControllerService,
    TodoTodoListControllerService,
    UserControllerService,
    UserTodoListControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
