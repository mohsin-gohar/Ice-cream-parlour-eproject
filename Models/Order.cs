using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ice_Cream_Parlour_Eproject.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string? UserId { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Contact { get; set; } = string.Empty;

        [Required]
        public string DeliveryAddress { get; set; } = string.Empty;

        [Required]
        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public virtual Book? Book { get; set; }

        [Required]
        [Range(0.01, 9999.99)]
        [DataType(DataType.Currency)]
        public decimal TotalAmount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;

        public string? PaymentStatus { get; set; } = "Pending";

        public string OrderStatus { get; set; } = "Pending";

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public DateTime? DeliveryDate { get; set; }

        public string? SpecialInstructions { get; set; }
        public string OrderNumber { get; internal set; }
    }
}