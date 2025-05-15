using Backend.Dto;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddExpense([FromBody] AddExpenseDto expenseDto)
        {
            if (expenseDto == null)
            {
                return BadRequest("Invalid expense data.");
            }
            var result = await _expenseService.AddExpenseAsync(expenseDto);
            if (result)
            {
                return Ok("Expense added successfully.");
            }
            return BadRequest("Failed to add expense.");
        }

        [HttpGet("history")]

        public async Task<IActionResult> GetExpensesByDateRange([FromQuery] DateRangeDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid date range.");
            }
            var expenses = await _expenseService.GetExpensesByDateRange(dto);
            if (expenses != null && expenses.Count > 0)
            {
                return Ok(expenses);
            }
            return NotFound("No expenses found for the given date range.");
        }

        [HttpGet("summary")]

        public async Task<IActionResult> GetMonthlyExpenseSummary(int userId, int month, int year)
        {
            var summary = await _expenseService.GetMonthlyExpenseSummary(userId, month, year);
            if (summary != null && summary.Count > 0)
            {
                return Ok(summary);
            }
            return NotFound("No expense summary found for the given month and year.");
        }
    }
}
