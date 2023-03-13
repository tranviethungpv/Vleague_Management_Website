using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class TrandauCauthu
{
    public string TranDauId { get; set; } = null!;

    public string CauThuId { get; set; } = null!;

    public int? ThoiGianBatDau { get; set; }

    public int? ThoiGianKetThuc { get; set; }

    public int? PhamLoi { get; set; }

    public int? TheVang { get; set; }

    public int? TheDo { get; set; }

    public virtual Cauthu CauThu { get; set; } = null!;

    public virtual Trandau TranDau { get; set; } = null!;
}
