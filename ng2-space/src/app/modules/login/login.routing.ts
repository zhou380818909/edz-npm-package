import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "../../../../projects/edz-ng2-library/src/public-api";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      noCache: true,
      hiddenInTab: true,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class LoginRouting  {}
