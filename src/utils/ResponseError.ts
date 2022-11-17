class ResponseError extends Error {
  status: boolean;
  payload: any;
  statusCode: number;

  constructor(status: boolean, message: string, statusCode: number) {
    super(message);
    this.status = status;
    this.payload = null;
    this.statusCode = statusCode;
  }
}

export default ResponseError;
