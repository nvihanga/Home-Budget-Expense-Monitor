using Backend.Dto;

namespace Backend.Services
{
    public interface IBudgetService
    {
        Task<decimal?> GetMonthlyBudget(int userId, int categoryId );
        Task<bool> UpdateBudget(BudgetUpdateDto dto);
    }
}
