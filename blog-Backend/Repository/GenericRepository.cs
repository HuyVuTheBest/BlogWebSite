using blog_Backend.Data;
using blog_Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace blog_Backend.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly BlogAppContext _context;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(BlogAppContext context) {
            _context = context ;
            _dbSet = _context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
             await SaveChangesAsync();


        }

        public async Task DeleteAsync(int id)
        {
             var entity = await _dbSet.FindAsync(id);
             _dbSet.Remove(entity);
             await SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return  await _dbSet.FindAsync(id);


        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
            SaveChangesAsync();
        }
    }
}
