using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class TinTuc
{
    public string TinTucId { get; set; } = null!;

    public string? TieuDe { get; set; }

    public string? NoiDung { get; set; }

    public DateTime? NgayTao { get; set; }

    public string? TenDangNhap { get; set; }

    public string? Anhdaidien { get; set; }

    public virtual TaiKhoan? TenDangNhapNavigation { get; set; }
}
