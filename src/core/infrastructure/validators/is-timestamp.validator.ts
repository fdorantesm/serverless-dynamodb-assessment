import type { Json } from '@/types/json.type';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsTimestamp(validationOptions?: ValidationOptions) {
  return function (object: Json, propertyName: string) {
    registerDecorator({
      name: 'IsTimestamp',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const date = new Date(value);
          return typeof value === 'number' && !isNaN(date.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid timestamp`;
        },
      },
    });
  };
}
