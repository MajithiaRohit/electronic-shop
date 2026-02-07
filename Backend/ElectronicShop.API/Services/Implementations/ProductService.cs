using ElectronicShop.API.Common;
using ElectronicShop.API.Data;
using ElectronicShop.API.DTOs.Product;
using ElectronicShop.API.Models;
using ElectronicShop.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ElectronicShop.API.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllProductsAsync()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category!.Name,
                })
                .ToListAsync();
            if(!products.Any())
                throw new NotFoundException("No Products are Added.");

            return products;
        }

        public async Task<ProductResponseDto?> GetProductByIdAsync(int id)
        {
            var produtc = await _context.Products
                .Include(p => p.Category)
                .Where(p => p.Id == id)
                .Select(p => new ProductResponseDto
                { 
                    Id = p.Id,
                    Name = p.Name,
                    Description= p.Description,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category!.Name
                })
                .FirstOrDefaultAsync();

            if (produtc == null)
                throw new NotFoundException($"Product id : {id} is not Found.");

            return produtc;
        }

        public async Task CreateProductAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                StockQuantity = dto.StockQuantity,
                IsActive = true,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow,
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(int id,UpdateProductDto dto)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null) throw new NotFoundException($"Product Id {id} is not Found.");

            existingProduct.Name = dto.Name;
            existingProduct.Description = dto.Description;
            existingProduct.Price = dto.Price;
            existingProduct.StockQuantity = dto.StockQuantity;
            existingProduct.IsActive = dto.IsActive;
            existingProduct.CategoryId = dto.CategoryId;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null) throw new NotFoundException($"Product id {id} is not found.");
            _context.Products.Remove(existingProduct);
            await _context.SaveChangesAsync();
        }
    }
}
