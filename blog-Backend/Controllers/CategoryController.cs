using blog_Backend.Interfaces;
using blog_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blog_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {

        private readonly IGenericRepository<Category> _ICategoryRepository;
        public CategoryController(IGenericRepository<Category> genericRepository)
        {
            _ICategoryRepository = genericRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCategory()
        {
            var cateList = await _ICategoryRepository.GetAllAsync();
            return Ok(cateList);
        }

       
    }
}
