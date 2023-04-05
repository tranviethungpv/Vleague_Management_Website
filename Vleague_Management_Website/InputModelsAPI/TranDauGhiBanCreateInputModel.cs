namespace Vleague_Management_Website.InputModelsAPI
{
    public class TranDauGhiBanCreateInputModel
    {
        public string GhiBanId { get; set; } = null!;

        public string? TranDauId { get; set; }

        public string? CauLacBoId { get; set; }

        public int? ThoiDiemGhiBan { get; set; }

        public string? CauThuId { get; set; }
    }
}
