import { Injectable, ProviderScope } from '@graphql-modules/di';
import { SyncInitProvider } from './base.provider';
import 'reflect-metadata';

export interface ILogger {
    log: (message: string) => void;
    info: (message: string) => void;
    error: (error: string | Error) => void;
}

/**
 * This is the defalt logger that could be changed
 */

@Injectable({
  scope: ProviderScope.Application
})
export class DefaultLoggerProvider extends SyncInitProvider implements ILogger {
  constructor() {
    super('DefaultLoggerProvider');
  }

  public initializer(): void {
    console.log('DefaultLoggerProvider');
  }

  public log(message: string): void {
    console.log(message);
  }

  public info(message: string): void {
    console.info(message);
  }

  public error(message: string | Error): void {
    console.error(message);
  }
}
