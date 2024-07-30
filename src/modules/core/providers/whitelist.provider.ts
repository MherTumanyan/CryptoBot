import { ProviderScope, Injectable } from '@graphql-modules/di';
import { AsyncInitProvider } from './base.provider';
import { NamespaceEntityProvider, DefaultEnvProvider } from '.';
import { EntityEnum } from '..';
import { Whitelist } from '../types';
import { Model, Document } from 'mongoose';

@Injectable({
  scope: ProviderScope.Application
})
export class WhitelistProvider extends AsyncInitProvider {
  constructor(private nsp: NamespaceEntityProvider, private envProvider: DefaultEnvProvider) {
    super('WhitelistProvider');
  }

  public async initializer(): Promise<void> {
    await this.nsp.onInit();
    this.envProvider.onInit();
    await this.createWhitelists();
  }

  public async createWhitelists(): Promise<void> {
    try {
      const WhitelistModel = this.nsp.getEntityModel<Model<Whitelist & Document>>(EntityEnum.WHITELIST);

      const existingWhitelist = await WhitelistModel.findOne({});

      if (!existingWhitelist) {
        await WhitelistModel.create({
          whitelists: {
            whitelistForDev: [
              '839062251',
              '575960532',
              '378989178',
              '577873744',
              '796175303',
              '768396883',
              '1089166946',
              '346116828',
              '713683395',
              '1067269019',
              '687635194'
            ]
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
