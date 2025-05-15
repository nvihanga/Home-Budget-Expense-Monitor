namespace Backend.Dto
{
    public class ExpenseSummaryDto
    {
        public string CategoryName { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal Budget { get; set; }
        public decimal Remaining => Budget - TotalSpent;
    }
}
