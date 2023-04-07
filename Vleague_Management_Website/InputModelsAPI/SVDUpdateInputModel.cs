using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.InputModelsAPI
{
    
    
        public class SVDUpdateInputModel
        {
            public string SanVanDongId { get; set; } = null!;

            public string? TenSan { get; set; }

            public string? ThanhPho { get; set; }

            public int? NamBatDau { get; set; }

            //public virtual Caulacbo? Caulacbo { get; set; }

        }
    
}
