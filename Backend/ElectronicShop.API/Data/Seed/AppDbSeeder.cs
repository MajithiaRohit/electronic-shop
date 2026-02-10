using ElectronicShop.API.Helpers;
using ElectronicShop.API.Models;
using System;

namespace ElectronicShop.API.Data.Seed
{
    public static class AppDbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            SeedAdminUser(context);
        }

        private static void SeedAdminUser(ApplicationDbContext context)
        {
            // Check if any admin already exists
            if (context.Users.Any(u => u.Role == "Admin"))
                return;

            var admin = new User
            {
                Name = "System Admin",
                Email = "admin@electronicshop.com",
                Password = PasswordHasher.Hash("Admin@123"),
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);
            context.SaveChanges();
        }
    }
}
