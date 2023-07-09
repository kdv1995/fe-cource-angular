//Angular modules
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//Components
import { PostsComponent } from "./posts.component";
import { PostComponent } from "./post/post.component";
import { EditComponent } from "./post/edit/edit.component";
import { CreateComponent } from "./post/create/create.component";

//Auth guard
import { authGuard } from "../auth-page/auth.guard";

//Material modules
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";

const routes: Routes = [
  {
    path: "posts",
    title: "Posts",
    component: PostsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "create",
        title: "Create a post",
        component: CreateComponent,
        canActivate: [authGuard],
      },
      {
        path: "edit/:id",
        title: "Edit a post",
        component: EditComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
@NgModule({
  declarations: [PostsComponent, PostComponent, EditComponent, CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
  ],
  exports: [PostsComponent],
})
export class PostsModule {}
