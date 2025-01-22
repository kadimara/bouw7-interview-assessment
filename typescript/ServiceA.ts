import { Logger } from './Logger';
import { Service } from './Service';

// @Service({
//     // Factory function to create the service asynchronously.
//     factory: async (constructorArguments) =>
//       new ServiceA(...constructorArguments),
//   })
@Service()
export class ServiceA {
  constructor(private logger: Logger) {
    this.logger.log('ServiceA created');
  }

  public doSomething() {
    this.logger.log('ServiceA doing something');
  }
}
