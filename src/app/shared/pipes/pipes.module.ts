import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { FilterPipe } from './filter.pipe';
import { GetByIdPipe } from './get-by-id.pipe';
import { HtmlToPlaintextPipe } from './html-to-plaintext.pipe';
import { CamelCaseToDashPipe } from './camel-case-to-dash.pipe';


@NgModule({
  declarations: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe

  ],
  imports: [],
  exports: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe
  ]
})
export class PipesModule { }
