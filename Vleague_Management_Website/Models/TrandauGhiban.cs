using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class TrandauGhiban
{
    public string GhiBanId { get; set; } = null!;

    public string? TranDauId { get; set; }

    public string? CauLacBoId { get; set; }

    public int? ThoiDiemGhiBan { get; set; }

    public string? CauThuId { get; set; }

    public int? VaoLuoiNha { get; set; }

    public virtual Caulacbo? CauLacBo { get; set; }

    public virtual Cauthu? CauThu { get; set; }

    public virtual Trandau? TranDau { get; set; }
}
