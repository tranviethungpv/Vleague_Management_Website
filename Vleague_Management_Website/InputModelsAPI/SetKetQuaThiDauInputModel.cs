namespace Vleague_Management_Website.InputModelsAPI
{
    public class SetKetQuaThiDauInputModel
    {
        public string TranDauId { get; set; } = null!;

        public DateTime? HiepPhu { get; set; }

        public string? KetQua { get; set; }
    }
}
