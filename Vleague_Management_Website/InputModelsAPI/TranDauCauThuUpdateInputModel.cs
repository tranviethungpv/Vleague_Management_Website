using Microsoft.Build.Framework;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.InputModelsAPI
{
    public class TranDauCauThuUpdateInputModel
    {
        [Required]
        public string TranDauId { get; set; } = null!;

        [Required]
        public string CauThuId { get; set; } = null!;
       
        public int? ThoiGianBatDau { get; set; }

        public int? ThoiGianKetThuc { get; set; }

        public int? PhamLoi { get; set; }

        public int? TheVang { get; set; }

        public int? TheDo { get; set; }

    }
}
