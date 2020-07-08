import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { StoreComponent } from './store.component'

const routes: Route[] = [
  {
    path: 'list',
    component: StoreComponent,
  },
  {
    path: 'detail',
    children: [
      { path: ':id', component: StoreComponent },
    ],
    // component: StoreComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRouting {}
