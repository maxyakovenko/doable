import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({ maxAge: 10 })
    ]
})

export class StateModule {}