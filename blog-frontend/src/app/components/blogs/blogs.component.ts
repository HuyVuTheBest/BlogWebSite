import { Component, inject } from '@angular/core';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { Blog } from '../../types/blog';
import { BlogService } from '../../services/BLogServices/blog.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
allBlog!: Blog[];
blogService = inject(BlogService)
ngOnInit(){
  this.blogService.getAllBlog().subscribe(res => {
    this.allBlog = res;
  })
}

}
