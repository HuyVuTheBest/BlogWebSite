using blog_Backend.Dto;
using blog_Backend.Interfaces;
using blog_Backend.Mapper;
using blog_Backend.Models;
using blog_Backend.Service;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace blog_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : Controller
    {
        private readonly IFileService _fileService;

        private readonly IGenericRepository<Blog> _blogRepository;

        public BlogController(IGenericRepository<Blog> blogRepository, IFileService fileService)
        {
            _blogRepository = blogRepository;
            _fileService = fileService;

        }
        [HttpGet]
        public async Task<ActionResult> GetAllBlog()
        {
            var blogList = await _blogRepository.GetAllAsync();
            if (blogList == null)
            {
                return NotFound();
            }
            return Ok(blogList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetBlogById([FromRoute]int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            if(blog == null)
            {
                return NotFound();
            }

            var blogDto = DtoMapper.BlogDtoMapper(blog);
            return Ok(blogDto);
        }

        [HttpGet("featured")]
        public async Task<ActionResult> GetFeaturedBlogList()
        {
            var blogList = await _blogRepository.GetAllAsync();
            var featuredBlog = blogList.Where(blog => blog.IsFeatured == true).Select(dtoBlog => DtoMapper.BlogDtoMapper(dtoBlog)).ToList();

            return Ok(featuredBlog);
        }


        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> AddBlog([FromBody] BlogDto blogdto,IFormFile image)
        {

            var entityBlog = DtoMapper.BlogEntityMapper(blogdto);

            if (image != null)
            {

                var imagePath = await _fileService.SaveFileAsync(image);

                entityBlog.Image = imagePath;
            }
            await _blogRepository.AddAsync(entityBlog);
            return Ok(entityBlog);
        }


        [HttpPut("BlogidUpdate{id}")]
        public async Task<ActionResult> UpdateBlog([FromRoute] int id,[FromBody] BlogDto updatedblog)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            blog.CategoryId = updatedblog.CategoryId;
            blog.Title = updatedblog.Title;
            blog.Description = updatedblog.Description;
            blog.IsFeatured = updatedblog.IsFeatured;
            blog.BlogContent = updatedblog.BlogContent;
            blog.Image = updatedblog.Image;
            _blogRepository.Update(blog);
            return Ok(updatedblog);
        }
        [HttpDelete("BlogidDelete{id}")]
        public async Task<ActionResult> DeleteBlog([FromRoute] int id)
        {
            try
            {
                await _blogRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
