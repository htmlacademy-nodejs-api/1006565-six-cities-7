import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    console.log('parameters', parameters)
    // const [count, filepath, url] = parameters;
    // const offerCount = Number.parseInt(count, 10);

    // code for getting data from server.
    // form offer.
  }
}
