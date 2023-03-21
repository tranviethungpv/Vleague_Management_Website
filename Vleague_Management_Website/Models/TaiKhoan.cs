using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class TaiKhoan
{
    public string TenDangNhap { get; set; } = null!;

    public string? MatKhau { get; set; }

    public int? LoaiTaiKhoan { get; set; }

    public virtual ICollection<NguoiDung> NguoiDungs { get; } = new List<NguoiDung>();
}
