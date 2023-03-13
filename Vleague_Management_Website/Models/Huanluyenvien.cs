using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class Huanluyenvien
{
    public string HuanLuyenVienId { get; set; } = null!;

    public string? TenHlv { get; set; }

    public int? NamSinh { get; set; }

    public string? QuocTich { get; set; }

    public virtual ICollection<Caulacbo> Caulacbos { get; } = new List<Caulacbo>();
}
