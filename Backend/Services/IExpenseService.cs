using Backend.Dto;
using Backend.Models;

namespace Backend.Services
{
    public interface IExpenseService
    {
        Task<bool> AddExpenseAsync(AddExpenseDto expenseDto);
        Task<List<Expense>> GetExpensesByDateRange(DateRangeDto dto);
        Task<List<ExpenseSummaryDto>> GetMonthlyExpenseSummary(int userId, int month, int year);
        Task<List<ExpenseCategory>> GetExpenseCategoriesAsync();

        Task AddExpenseCategoryAsync(ExpenseCategoryDto dto);


    }
}
