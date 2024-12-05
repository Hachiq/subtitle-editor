import { Routes } from '@angular/router';
import { EditorComponent } from '../core/pages/editor/editor.component';
import { GeneratorComponent } from '../core/pages/generator/generator.component';

export const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: '', redirectTo: 'editor', pathMatch: 'full' }
];
