namespace Vleague_Management_Website.InputModelsAPI
{
    public class TranDauGhiBanUpdateInputModel
    {
        public string GhiBanId { get; set; } = null!;

        public int? ThoiDiemGhiBan { get; set; }

        public string? TranDauId { get; set; }

        public string? CauLacBoId { get; set; }

        public string? CauThuId { get; set; }
    }
}
