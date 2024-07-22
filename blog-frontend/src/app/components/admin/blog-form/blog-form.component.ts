import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CategoryService } from '../../../services/CategoryServices/category.service';
import { Category } from '../../../types/category';
import { BlogService } from '../../../services/BLogServices/blog.service';
import { Blog } from '../../../types/blog';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,ReactiveFormsModule,MatCheckboxModule,],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent {
  formBuilder = inject(FormBuilder)
  categoryService = inject(CategoryService)
  blogService = inject(BlogService)
  categoryList : Category[] = []
  blog! : Blog
  route = inject(ActivatedRoute)
  router = inject(Router)
  isEdit = false


  blogform = this.formBuilder.group({
    id:[null],
    categoryId:[null,[Validators.required]],
    title:["",[Validators.required]],
    description:[''],
    blogContent:['',[Validators.required]],
    image:[''],
    isFeatured:[false]

  })
  
  ngOnInit(){
    this.categoryService.getCategoryList().subscribe(x=>this.categoryList =x);


    const id = this.route.snapshot.params['id'];
    if(id !=null){
      this.isEdit = true;
      this.blogform.patchValue({id})
      this.getBlogFormValue()
    }
  
  }

  updateBlog(){
    let model:any = this.blogform.value
    if(this.blogform.invalid){
      Swal.fire('Validation Error', 'Please fill out all required fields correctly.', 'error');
      return;
    }else{
      this.blogService.editBlog(model.id! , model as Blog ).subscribe(()=>{
        Swal.fire("Updated Success", "You have updated your Blog", "success").then(()=>{
          this.router.navigateByUrl("admin/manage-blogs")
        });
      })
    }
  }

  createBlog(){
    if(this.blogform.invalid){
      Swal.fire('Validation Error', 'Please fill out all required fields correctly.', 'error');
      return;
    }else{
      let model:any = this.blogform.value
      this.blogService.addBlog(model as Blog).subscribe(()=>{
        Swal.fire("Created", "You have created a Blog", "success").then(()=>{
          this.router.navigateByUrl("admin/manage-blogs")
        });
      
      })
    }
  }

  Back(){
    this.router.navigateByUrl("admin/manage-blogs")
  }

  getBlogFormValue(){
    let id = this.route.snapshot.params['id'];
    this.blogService.getBlogByID(id).subscribe(res =>{
    this.blogform.patchValue(res as any)
  })
  }



}
