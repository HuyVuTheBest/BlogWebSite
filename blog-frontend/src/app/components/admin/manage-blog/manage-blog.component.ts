import {Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Blog } from '../../../types/blog';
import { BlogService } from '../../../services/BLogServices/blog.service';
import {MatButtonModule} from '@angular/material/button';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/CategoryServices/category.service';
import { AlertService } from '../../../services/AlertServices/alert-service.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-blog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink],
  templateUrl: './manage-blog.component.html',
  styleUrl: './manage-blog.component.scss'
})
export class ManageBlogComponent {

  displayedColumns: string[] = ['id', 'Title', 'Category','Action'];
  dataSource: MatTableDataSource<Blog>;
  alertService = inject(AlertService)
  blogs: Blog[] =[]
  blogService = inject(BlogService)
  categoryservice = inject(CategoryService)
  categoryList: Category[] =[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.blogs);
  }
  loadBlogs(): void {
    this.blogService.getAllBlog().subscribe((blogs: Blog[]) => {
      this.dataSource.data = blogs;
    });
  }
  
  ngOnInit(){
    this.loadBlogs()
    this.categoryservice.getCategoryList().subscribe(res=>{
    this.categoryList = res;
  })
  
  }


  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getCategoryName(row: Blog){
    return this.categoryList.find(x=>x.id === row.categoryId)?.name
  }

  editBlog(row: Blog){
    console.log(row)
  }

  deleteBlog(row: Blog) {
    this.alertService.showAlert("Are you sure you want to delete this blog?").then((confirmed) => {
      if (confirmed) {
        this.blogService.deleteBlog(row.id!).subscribe(()=>{
          Swal.fire("Deleted!", "", "success");
          this.loadBlogs()
        })       
      }
    });
  }
}

