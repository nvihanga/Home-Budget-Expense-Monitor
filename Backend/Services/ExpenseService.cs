using Backend.Dto;
using Backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.Data;

namespace Backend.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly string _connectionString;

        public ExpenseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

      
        public async Task<bool> AddExpenseAsync(AddExpenseDto dto)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_AddExpense", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", dto.UserId);
                    cmd.Parameters.AddWithValue("@CategoryId", dto.CategoryId);
                    cmd.Parameters.AddWithValue("@Amount", dto.Amount);
                    cmd.Parameters.AddWithValue("@Date", dto.Date);
                    cmd.Parameters.AddWithValue("@Description", dto.Description ?? string.Empty);

                    await conn.OpenAsync();
                    int rows = await cmd.ExecuteNonQueryAsync();
                    return rows > 0;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error: {ex.Message}");
                throw new ApplicationException("Database error occured");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw new ApplicationException("An error occured while adding the expense");
            }

        }

        public async Task AddExpenseCategoryAsync(ExpenseCategoryDto dto)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_AddExpenseCategory", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CategoryName", dto.CategoryName);


                    await conn.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error: {ex.Message}");
                throw new ApplicationException("Database error occured");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding category: " + ex.Message);
                throw;
            }

        }

        public async Task<List<ExpenseCategory>> GetExpenseCategoriesAsync()
        {
            var categories = new List<ExpenseCategory>();
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_GetAllExpenseCategories", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    await conn.OpenAsync();

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            categories.Add(new ExpenseCategory
                            {
                                CategoryId = reader.GetInt32(0),
                                CategoryName = reader.GetString(1)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return categories;
        }

        public async Task<List<Expense>> GetExpensesByDateRange(DateRangeDto dto)
        {
            var expenses = new List<Expense>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_GetExpensesByDateRange", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", dto.UserId);
                    cmd.Parameters.AddWithValue("@StartDate", dto.StartDate);
                    cmd.Parameters.AddWithValue("@EndDate", dto.EndDate);

                    await conn.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            expenses.Add(new Expense
                            {
                                ExpenseId = reader.GetInt32(0),
                                UserId = reader.GetInt32(1),
                                CategoryId = reader.GetInt32(2),
                                Amount = reader.GetDecimal(3),
                                Date = reader.GetDateTime(4),
                                Description = reader.GetString(5)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return expenses;
        }

        public async Task<List<ExpenseSummaryDto>> GetMonthlyExpenseSummary(int userId, int month, int year)
        {
            var summaryList = new List<ExpenseSummaryDto>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_GetExpenseSummary", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    cmd.Parameters.AddWithValue("@Month", month);
                    cmd.Parameters.AddWithValue("@Year", year);

                    await conn.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            summaryList.Add(new ExpenseSummaryDto
                            {
                                CategoryName = reader.GetString(0),
                                TotalSpent = reader.GetDecimal(1),
                                Budget = reader.GetDecimal(2)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return summaryList;
        }

        
    }
}
