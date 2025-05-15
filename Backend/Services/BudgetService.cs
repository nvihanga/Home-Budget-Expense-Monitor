
using System.Data;
using Backend.Dto;
using Microsoft.Data.SqlClient;

namespace Backend.Services
{
    public class BudgetService : IBudgetService
    {

        private readonly string _connectionString;

        public BudgetService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<decimal?> GetMonthlyBudget(int userId, int categoryId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_GetMonthlyBudget", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    cmd.Parameters.AddWithValue("@CategoryId", categoryId);

                    await conn.OpenAsync();
                    object result = await cmd.ExecuteScalarAsync();

                    if (result != null && result != DBNull.Value)
                        return Convert.ToDecimal(result);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;

        }

        public async Task<bool> UpdateBudget(BudgetUpdateDto dto)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                using (SqlCommand cmd = new SqlCommand("sp_UpdateBudget", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", dto.UserId);
                    cmd.Parameters.AddWithValue("@CategoryId", dto.CategoryId);
                    cmd.Parameters.AddWithValue("@NewBudget", dto.NewBudget);
                    await conn.OpenAsync();
                    int rows = await cmd.ExecuteNonQueryAsync();
                    return rows > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
