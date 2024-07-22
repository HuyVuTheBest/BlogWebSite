using blog_Backend.Dto;
using blog_Backend.Models;

namespace blog_Backend.Mapper
{
    public static class DtoMapper
    {
        public static BlogDto BlogDtoMapper(Blog blog)
        {
            return new BlogDto
            {
                Title = blog.Title,
                Description = blog.Description,
                BlogContent = blog.BlogContent,
                Image = blog.Image,
                CategoryId = blog.CategoryId,
                IsFeatured = blog.IsFeatured
            };
        }
        public static Blog BlogEntityMapper(BlogDto blog)
        {
            return new Blog
            {
                Title = blog.Title,
                Description = blog.Description,
                BlogContent = blog.BlogContent,
                Image = blog.Image,
                CategoryId = blog.CategoryId,
                IsFeatured = blog.IsFeatured,
                Category = null
            };
        }
    }
}
