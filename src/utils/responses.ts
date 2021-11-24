
import {IReturnObject} from '../types/IreturnObj'
export function Return(option: IReturnObject): IReturnObject {
  return {
      error: option.error,
      statusCode: option.statusCode,
      errorMessage: option.errorMessage || null,
      sucessMessage: option.sucessMessage || null,
      data: option.data || null,
      
  }
}
