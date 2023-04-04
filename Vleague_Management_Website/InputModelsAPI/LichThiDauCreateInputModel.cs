namespace Vleague_Management_Website.InputModelsAPI
{
    public class LichThiDauCreateInputModel
    {
        public string TranDauId { get; set; } = null!;

        public DateTime? NgayThiDau { get; set; }

        public string? Clbkhach { get; set; }

        public string? Clbnha { get; set; }

        public string? SanVanDongId { get; set; }

        public int? Vong { get; set; }
    }
}
