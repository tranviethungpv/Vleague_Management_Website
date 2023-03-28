using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class Caulacbo
{
    public string CauLacBoId { get; set; } = null!;

    public string? TenClb { get; set; }

    public string? TenGoi { get; set; }

    public string? SanVanDongId { get; set; }

    public string? HuanLuyenVienId { get; set; }

    public string? AnhDaiDien { get; set; }

    public virtual ICollection<Cauthu> Cauthus { get; } = new List<Cauthu>();

    public virtual Huanluyenvien? HuanLuyenVien { get; set; }

    public virtual Sanvandong? SanVanDong { get; set; }

    public virtual ICollection<Trandau> TrandauClbkhachNavigations { get; } = new List<Trandau>();

    public virtual ICollection<Trandau> TrandauClbnhaNavigations { get; } = new List<Trandau>();

    public virtual ICollection<TrandauGhiban> TrandauGhibans { get; } = new List<TrandauGhiban>();
}
