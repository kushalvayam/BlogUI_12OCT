import { Component,OnInit, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: BlogPost[] = [];
  newPost: BlogPost = { Text: '', Created: '' };
  editingPost: BlogPost | null = null;
  params: Object | any = {};
  TempBlogList: Array<object> | any = [];
  BrfCsLst: Array<any> = [];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.BrfCsLst=[];
    this.blogService.getBlogPosts().subscribe(
      posts => {
      this.BrfCsLst = posts;
      
    });
  }

  addPost(): void {
    this.blogService.addBlogPost(this.newPost).subscribe(post => {
      this.posts.push(post);
      this.newPost = { Text: '', Created: '' }; // Reset form
      this.loadPosts();
    });
  }

  editPost(post: BlogPost): void {
    this.editingPost = { ...post }; // Create a copy for editing
  }

  // updatePost(): void {
  //   debugger;
  //   if (this.editingPost) {
  //     this.blogService.updateBlogPost(this.editingPost).subscribe(updatedPost => {
  //       const index = this.posts.findIndex(post => post.Id === updatedPost.Id);
  //       if (index !== -1) {
  //         this.posts[index] = updatedPost;
  //       }
  //       this.editingPost = null; // Clear editing state
  //     });
  //   }
  // }
  updatePost(): void {
    if (this.editingPost) {
    this.blogService.updateBlogPost(this.editingPost).subscribe(updatedPost => {
       const index = this.posts.findIndex(post => post.Id === updatedPost.Id);
        if (index !== -1) {
          this.posts[index] = updatedPost; // Update the existing post in the array
      }
      this.editingPost = null; // Clear editing state
    });
  }
  }

  deletePost(id: any): void {
    this.blogService.deleteBlogPost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.Id !== id);
      this.loadPosts();
    });
  }
}