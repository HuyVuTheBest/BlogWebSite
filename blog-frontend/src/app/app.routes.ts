import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ManageBlogComponent } from './components/admin/manage-blog/manage-blog.component';
import { BlogFormComponent } from './components/admin/blog-form/blog-form.component';

export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent
    },
    {
        path:"blogs",
        component: BlogsComponent
    },
    {
        path:"blog/:id",
        component: BlogComponent
    },
    {
        path:"about",
        component: AboutComponent
    },
    {
        path:"admin/manage-blogs",
        component: ManageBlogComponent
    },
    {
        path:"admin/blog/create",
        component: BlogFormComponent
    },
    {
        path:"admin/blog/update/:id",
        component: BlogFormComponent
    },

];
