import { NgModule } from '@angular/core';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { TodoListFacade } from './todos/todos.facade';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './todos/todos.effects';
import { HttpClientModule } from '@angular/common/http';

const storeConfig: RootStoreConfig<any, any> = {
    runtimeChecks: {
      strictActionImmutability: true,
      strictActionSerializability: true,
      strictStateImmutability: true,
      strictStateSerializability: true,
    },
  };

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, storeConfig),
        EffectsModule.forRoot(TodosEffects),
        StoreDevtoolsModule.instrument({ maxAge: 10 })
    ],
    providers: [TodoListFacade]
})

export class StateModule {}