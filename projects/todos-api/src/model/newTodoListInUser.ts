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
 * (tsType: @loopback/repository-json-schema#Optional<Omit<TodoList, 'id'>, 'userId'>, schemaOptions: { title: 'NewTodoListInUser', exclude: [ 'id' ], optional: [ 'userId' ] })
 */
export interface NewTodoListInUser { 
    title: string;
    userId?: number;
}