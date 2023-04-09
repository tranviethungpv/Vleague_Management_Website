namespace Vleague_Management_Website.InputModelsAPI
{
    public class TinTucCreateInputModel
    {
        public string? TinTucId { get; set; }
        public DateTime? NgayTao { get; set; }
        public string? TieuDe { get; set; }
        public string? NoiDung { get; set; }
        public IFormFile? Image { get; set; }
    }
}
