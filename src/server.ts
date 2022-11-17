import App from "./app";

require("dotenv").config();

class Server extends App {
  uri: string = String(process.env.APP_URI);
  port: number = Number(process.env.APP_PORT);

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is Running at ${this.uri}:${this.port}`);
    });
  }
}

new Server().listen();
