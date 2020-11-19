
export interface extra {
  extra: string
}



// Start函数装饰器
// MethodDecorator = <T>(target: Object, key: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | Void;
export function funDecorator(target: Object, key: string, descriptor:any){
  const oldValue = descriptor.value;
  // do something
  descriptor.value = function() {
    // do something
    oldValue.apply(target);
  };
  return descriptor;
}

export function funDecoratorHigher(){
  return function(target: Object, key: string, descriptor:any){
    const oldValue = descriptor.value;
    // do something
    descriptor.value = function() {
      // do something
      oldValue.apply(target);
    };
    return descriptor;
  };
}
// End函数装饰器



// Start装饰类
export function classDecorator<T extends { new (...args: any[]): {} }> (constructor: T) {
  return class extends constructor implements extra {
    name: string = 'changed name';
    extra = 'decorator add extra prop';
    echoName: Function = function() {
      console.log(this.name);
    }
  };
}

export function classDecoratorHigher(name:string, extra:string){
  return function <T extends { new (...args: any[]): {} }> (constructor: T){
    return class extends constructor implements extra {
      name: string = name;
      extra = extra;
      echoName: Function = function() {
        console.log(this.name);
      }
    };
  };
}
// End装饰类



// Start装饰类的属性、方法
export function classPropDecorator(target:any, propertyKey: string, descriptor: PropertyDescriptor): any {
  const oldVal = descriptor.value;
  descriptor.value = function() {
    oldVal.apply(target);
  };
  return descriptor;
}

export function classPropDecoratorHigher(){
  return function(target:any, propertyKey: string, descriptor: PropertyDescriptor): any{
    const oldVal = descriptor.value;
    descriptor.value = function() {
      // do something
      // console.log(args);
      oldVal.apply(target);
    };
    return descriptor;
  };
}
// End装饰类的属性、方法


// Start 参数装饰器
export function paramsDecorator(target: any, key: string, index: number) {
  console.log(target, key, index);
}

// End 参数装饰器