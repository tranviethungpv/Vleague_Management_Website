using System;
using System.Collections.Generic;

namespace Vleague_Management_Website.Models;

public partial class Anhcaulacbo
{
    public string? CauLacBoId { get; set; }

    public string? TenFileAnh { get; set; }

    public virtual Caulacbo? CauLacBo { get; set; }
}
