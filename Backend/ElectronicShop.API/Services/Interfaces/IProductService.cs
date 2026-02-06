using ElectronicShop.API.DTOs.Product;

namespace ElectronicShop.API.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductResponseDto>> GetAllProductsAsync();
        Task<ProductResponseDto?> GetProductByIdAsync(int id);
        Task CreateProductAsync(CreateProductDto product);
        Task UpdateProductAsync(int id,UpdateProductDto product);
        Task DeleteProductAsync(int id);
    }
}
