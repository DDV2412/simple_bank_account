class ResponseData {
  status: boolean;
  message: string;
  payload: any;

  constructor(status: boolean, message: string, payload: any) {
    this.status = status;
    this.message = message;
    this.payload = payload;
  }
}

export default ResponseData;
