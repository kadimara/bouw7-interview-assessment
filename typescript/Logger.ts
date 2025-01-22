import { Service } from './Service';

@Service()
export class Logger {
  public log(message: string) {
    console.log(message);
  }
}
