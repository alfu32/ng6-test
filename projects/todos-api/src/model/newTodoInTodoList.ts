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

/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Todo, 'id'>, 'todoListId'>, schemaOptions: { title: 'NewTodoInTodoList', exclude: [ 'id' ], optional: [ 'todoListId' ] })
 */
export interface NewTodoInTodoList {
    title?: string;
    status?: string;
    dueDate?: Date;
    todoListId?: number;
}