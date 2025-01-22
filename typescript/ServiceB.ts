import { Logger } from './Logger';
import { Service } from './Service';
import { ServiceA } from './ServiceA';

@Service()
export class ServiceB {
  constructor(private logger: Logger, private serviceA: ServiceA) {
    this.logger.log('ServiceB created');
  }

  public doSomething() {
    this.logger.log('ServiceB doing something');
    return this.serviceA.doSomething();
  }
}
