import { Container } from './container';
import { ServiceB } from './ServiceB';

// Create a container instance
const container = Container.Compile();

// Resolve dependencies
const serviceB = container.get(ServiceB);
serviceB.doSomething(); // Output: Hello from ServiceA
