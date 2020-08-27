import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRouting } from "./login.routing";

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRouting]
})
export class LoginModule {}
