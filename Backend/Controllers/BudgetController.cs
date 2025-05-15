using Backend.Dto;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMonthlyBudget(int userId, int categoryId)
        {
            var budget = await _budgetService.GetMonthlyBudget(userId, categoryId);
            if (budget.HasValue)
            {
                return Ok(budget.Value);
            }
            return NotFound("Budget Not Found.");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateBudget([FromBody] BudgetUpdateDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid budget data.");
            }
            var result = await _budgetService.UpdateBudget(dto);
            if (result)
            {
                return Ok("Budget updated successfully.");
            }
            return NotFound("Faild to update budget.");
        }
    }

}
