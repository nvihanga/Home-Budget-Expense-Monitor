namespace Backend.Dto
{
    public class BudgetUpdateDto
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal NewBudget { get; set; }
    }
}
