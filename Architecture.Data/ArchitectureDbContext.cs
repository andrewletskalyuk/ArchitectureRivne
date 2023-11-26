using Architecture.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Architecture.Data
{
    public class ArchitectureDbContext : DbContext
    {
        public ArchitectureDbContext(DbContextOptions<ArchitectureDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            //Database.Migrate();
        }

        public DbSet<Expert> Experts { get; set; }
    }
}
