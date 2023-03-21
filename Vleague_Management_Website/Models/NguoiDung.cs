using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class NguoiDung
{
    public string NguoiDungId { get; set; } = null!;

    public string? HoTen { get; set; }

    public string? Sđt { get; set; }

    public string? Email { get; set; }

    public string? TenDangNhap { get; set; }

    public virtual TaiKhoan? TenDangNhapNavigation { get; set; }

    public virtual ICollection<TinTuc> TinTucs { get; } = new List<TinTuc>();
}
