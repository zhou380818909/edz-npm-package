import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Route } from '../../../../projects/edz-ng2-library/src/public-api'
import { StoreComponent } from './store.component'

const routes: Route[] = [
  {
    path: 'list',
    component: StoreComponent,
    data: {
      title: '库存列表(*)',
      disableClose: true,
    },
  },
  {
    path: 'detail',
    children: [
      { path: ':id', component: StoreComponent, data: { noCache: true, title: '仓库详情' } },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRouting {}
