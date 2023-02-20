using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    //ket noi giua database voi entities
    public class DataContext : DbContext
    {
    
        public DataContext(DbContextOptions options) : base(options)
        {
        }

            // tao cau noi giua app va csdl
        public DbSet<AppUser> Users { get; set; }
    }
}