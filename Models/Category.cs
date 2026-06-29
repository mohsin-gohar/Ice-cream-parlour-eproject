using System.ComponentModel.DataAnnotations;

namespace Ice_Cream_Parlour_Eproject.Models.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Category name is required")]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Description { get; set; }

        // Navigation: One Category has many Products
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}