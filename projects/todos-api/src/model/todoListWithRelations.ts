/**
 * lb4-test
 * test of looopback 4
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { TodoWithRelations } from './todoWithRelations';
import { UserWithRelations } from './userWithRelations';

/**
 * (tsType: TodoListWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TodoListWithRelations {
    id?: number;
    title: string;
    userId?: number;
    todos?: Array<TodoWithRelations>;
    user?: UserWithRelations;
}