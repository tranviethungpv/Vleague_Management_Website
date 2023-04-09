using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.InputModelsAPI
{
    public class TranDauCauThuCreateInputModel
    {
        public string TranDauId { get; set; } = null!;

        public string CauThuId { get; set; } = null!;

        public int? ThoiGianBatDau { get; set; }

        public int? ThoiGianKetThuc { get; set; }

        public int? PhamLoi { get; set; }

        public int? TheVang { get; set; }

        public int? TheDo { get; set; }

    }
}
