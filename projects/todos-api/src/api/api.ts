export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export * from './smartHomeController.service';
import { SmartHomeControllerService } from './smartHomeController.service';
export * from './todoController.service';
import { TodoControllerService } from './todoController.service';
export const APIS = [PingControllerService, SmartHomeControllerService, TodoControllerService];
