using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class Trandau
{
    public string TranDauId { get; set; } = null!;

    public DateTime? NgayThiDau { get; set; }

    public string? Clbkhach { get; set; }

    public string? Clbnha { get; set; }

    public string? SanVanDongId { get; set; }

    public int? Vong { get; set; }

    public DateTime? HiepPhu { get; set; }

    public string? KetQua { get; set; }

    public bool? TrangThai { get; set; }

    public virtual Caulacbo? ClbkhachNavigation { get; set; }

    public virtual Caulacbo? ClbnhaNavigation { get; set; }

    public virtual Sanvandong? SanVanDong { get; set; }

    public virtual ICollection<TrandauCauthu> TrandauCauthus { get; } = new List<TrandauCauthu>();

    public virtual ICollection<TrandauGhiban> TrandauGhibans { get; } = new List<TrandauGhiban>();
}
