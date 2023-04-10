using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.InputModelsAPI
{
    public class CauThuCreateInputModel
    {
        public string CauThuId { get; set; } = null!;

        public string? HoVaTen { get; set; }

        public string? CauLacBoId { get; set; }

        public DateTime? Ngaysinh { get; set; }

        public string? ViTri { get; set; }

        public string? QuocTich { get; set; }

        public string? SoAo { get; set; }

        public double? CanNang { get; set; }

        public double? ChieuCao { get; set; }

        public IFormFile? Image { get; set; }

        public virtual Caulacbo? CauLacBo { get; set; }
    }
}
