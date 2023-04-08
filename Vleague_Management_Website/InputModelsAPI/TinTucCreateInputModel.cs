namespace Vleague_Management_Website.InputModelsAPI
{
    public class TinTucCreateInputModel
    {
        public string TinTucId { get; set; } = null!;

        public string? TieuDe { get; set; }

        public string? NoiDung { get; set; }

        public DateTime? NgayTao { get; set; }

        //public string? NguoiDungId { get; set; }

        public string? Anhdaidien { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
