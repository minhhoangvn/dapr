export interface Response {
    customSuccess(httpStatusCode: number, message: string, data?: any): Response;
  }