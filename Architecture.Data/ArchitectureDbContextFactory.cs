using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Architecture.Data
{
    public class ArchitectureDbContextFactory : IDesignTimeDbContextFactory<ArchitectureDbContext>
    {
        public ArchitectureDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.data.json")
            .Build();

            var connectionString = configuration.GetConnectionString("PostgresConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ArchitectureDbContext>();

            optionsBuilder.UseNpgsql(connectionString);

            return new ArchitectureDbContext(optionsBuilder.Options);
        }
    }
}
