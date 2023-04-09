namespace Vleague_Management_Website.InputModelsAPI
{
    public class HuanLuyenVienUpdateInputModel
    {
        public string HuanLuyenVienId { get; set; } = null!;

        public string? TenHlv { get; set; }

        public int? NamSinh { get; set; }

        public string? QuocTich { get; set; }
    }
}
