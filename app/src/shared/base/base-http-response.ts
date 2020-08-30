export class BaseHttpResponse {
  statusCode: number;
  message: string | object;
  traceId?: string;
}
