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
import { TodoFields } from './todoFields';
import { TodoIncludeFilterItems } from './todoIncludeFilterItems';

export interface TodoFilter { 
    offset?: number;
    limit?: number;
    skip?: number;
    order?: Array<string>;
    fields?: TodoFields;
    include?: Array<TodoIncludeFilterItems>;
}