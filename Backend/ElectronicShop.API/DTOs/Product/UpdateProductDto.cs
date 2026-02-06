namespace ElectronicShop.API.DTOs.Product
{
    public class UpdateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int StockQuantity { get; set; }

        public bool IsActive { get; set; }

        public DateTime UpdatedAt { get; set; }
        public int CategoryId { get; set; }
    }
}
