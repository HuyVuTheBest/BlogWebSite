import { Component, inject, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Blog } from '../../types/blog';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/CategoryServices/category.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
@Input() item!:Blog
categoryservice = inject(CategoryService)
categoryList: Category[] =[]

ngOnInit(){
  
  this.categoryservice.getCategoryList().subscribe(res=>{
    this.categoryList = res;
  })

}

getCategoryName(){
  return this.categoryList.find(x=>x.id == this.item?.categoryId)?.name
}
}
