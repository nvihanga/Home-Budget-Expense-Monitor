using System.ComponentModel.DataAnnotations;

namespace Backend.Dto
{
    public class AddExpenseDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        [Range(0.01, 999999.99, ErrorMessage = "Amount must be greater than 0.")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [MaxLength(300)]
        public string Description { get; set; }
    }
}
