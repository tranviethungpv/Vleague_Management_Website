using Vleague_Management_Website.Models;
namespace Vleague_Management_Website.InputModelsAPI
{
    public class CLBCreateInputModel
    {
        public string CauLacBoId { get; set; } = null!;

        public string? TenClb { get; set; }

        public string? TenGoi { get; set; }
        public string? SanVanDongId { get; set; }

        public string? HuanLuyenVienId { get; set; }

        //public string? AnhDaiDien { get; set; }
    }
}
