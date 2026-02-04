using ElectronicShop.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ElectronicShop.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
    }
}
