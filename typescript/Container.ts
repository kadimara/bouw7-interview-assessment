import 'reflect-metadata';
import { ServiceB } from './ServiceB';

type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private dependencies: { [key: string]: any } = {};
  private compiling: Constructor | null = null;

  register(name, service: any): void {
    // Use class name directly
    this.dependencies[name] = service;
  }

  compile<T>(constructor: Constructor<T>): T {
    const constructorName = constructor.prototype.constructor.name;
    if (this.compiling == constructor) {
      throw new Error(`Circular dependency detected: ${constructorName}`);
    }

    // Is this class a service?
    const isService = Reflect.getMetadata('service', constructor);
    if (!isService) {
      throw new Error(`${constructorName} is not marked as a service.`);
    }

    const compiledService = this.dependencies[constructorName];
    if (compiledService != null) {
      return compiledService;
    }

    this.compiling = constructor;
    const paramTypes =
      Reflect.getMetadata('design:paramtypes', constructor) || [];
    const params = paramTypes.map((param: Constructor) => {
      return this.compile(param);
    });

    const service = new (constructor as Constructor<T>)(...params);
    this.register(constructorName, service);
    this.compiling = null;

    return service;
  }

  get<T>(constructor: Constructor<T>): T | undefined {
    const name = constructor.prototype.constructor.name;
    if (this.dependencies[name]) {
      return this.dependencies[name] as T | undefined;
    }
    throw new Error(`The requested service: ${name} is not registered`);
  }

  static Compile() {
    const container = new Container();
    container.compile(ServiceB);
    return container;
  }
}
