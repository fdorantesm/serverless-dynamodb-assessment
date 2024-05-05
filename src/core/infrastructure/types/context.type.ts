import { Context as LambdaContext } from 'aws-lambda';

export type Context = LambdaContext & {
  services: {
    [key: string]: any;
  };
};
