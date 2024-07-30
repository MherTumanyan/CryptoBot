import { OnInit } from '@graphql-modules/core';
import { EventEmitter } from 'events';

export interface OnSyncInit extends OnInit {
    onInit: () => void;
    initializer: () => void;
}

export abstract class SyncInitProvider extends EventEmitter implements OnSyncInit {
    private p: boolean;

    constructor(name?: string) {
      super();
      console.log(`BTC_CHANGE::Provider '${name}' constructor`);
    }

    public onInit(): void {
      if (this.p) return;
      this.p = true;
      this.initializer();
    }

    public abstract initializer(): void;
}

export interface OnAsyncInit extends OnInit {
    onInit: () => Promise<any>;
    initializer: () => Promise<any>;
}

export abstract class AsyncInitProvider extends EventEmitter implements OnAsyncInit {
    private p: Promise<any>;

    constructor(name?: string) {
      super();
      console.log(`BTC_CHANGE::Provider '${name}' constructor`);
    }

    public async onInit(): Promise<any> {
      if (this.p) return this.p;

      this.p = new Promise(async (res: any) => {
        await this.initializer();
        res();
      });

      return this.p;
    }

    public abstract initializer(): Promise<void>;
}
