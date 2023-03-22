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
        public DbSet<UserLike> Likes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>()
                .HasKey(k => new {k.SourceUserId,k.LikedUserId});
            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l =>l.LikedUsers)
                .HasForeignKey(s =>s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l =>l.LikedByUsers)
                .HasForeignKey(s =>s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        
    }
}