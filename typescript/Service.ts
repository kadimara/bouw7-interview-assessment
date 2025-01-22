export function Service() {
  return function (target: any) {
    Reflect.defineMetadata('service', true, target);
  };
}
