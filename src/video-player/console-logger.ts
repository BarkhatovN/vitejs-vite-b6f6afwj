export interface StateLogger {
  log(message: string): void;
}

export class ConsoleLogger implements StateLogger {
  constructor(private loggerName: string) {
  }

  log(message: string): void {
    console.log(`${this.loggerName}: ${message}`);
  }
}
