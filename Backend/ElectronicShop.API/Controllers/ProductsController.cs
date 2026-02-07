using ElectronicShop.API.DTOs.Product;
using ElectronicShop.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ElectronicShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync() {
            return Ok(await _service.GetAllProductsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _service.GetProductByIdAsync(id);
            if(product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto dto)
        {
            await _service.CreateProductAsync(dto);
            return Ok(new { Message = "Product Created Succesfully."});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, UpdateProductDto dto)
        {
            await _service.UpdateProductAsync(id, dto);
            return Ok(new { Message = "Product Updated Succesfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _service.DeleteProductAsync(id);
            return Ok(new { Message = "Product Deleted Successfully" });
        }
    }
}
