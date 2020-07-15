import { NgModule } from "@angular/core";
import { UserDetailComponent } from "./user-detail.component";
import { UserListComponent } from "./user-list.component";
import { UserInfoComponent } from "./user-info.component";
import { CommonModule } from "@angular/common";
import { UserRouting } from "./user.routing";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ UserDetailComponent, UserListComponent, UserInfoComponent ],
  imports: [ CommonModule, UserRouting, FormsModule ]
})
export class UserModule {}
