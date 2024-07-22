import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/BLogServices/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../types/blog';
import { CategoryService } from '../../services/CategoryServices/category.service';
import { Category } from '../../types/category';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

blogservice = inject(BlogService)
route = inject(ActivatedRoute)
categoryservice = inject(CategoryService)
blog! :Blog
categoryList: Category[] =[]

ngOnInit(){
  let id = this.route.snapshot.params['id'];
  this.blogservice.getBlogByID(id).subscribe(res =>{
    this.blog = res;
  })
  this.categoryservice.getCategoryList().subscribe(res=>{
    this.categoryList = res;
  })
}
getCategoryName(){
  return this.categoryList.find(x=>x.id ==this.blog?.categoryId)?.name
}

}
