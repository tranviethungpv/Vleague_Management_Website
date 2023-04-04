using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    public class LichThiDauController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        public IActionResult Index()
        {
            var listMatch = (from a in db.Trandaus 
                             join b in db.Caulacbos on a.Clbnha equals b.CauLacBoId
                             join c in db.Caulacbos on a.Clbkhach equals c.CauLacBoId
                             where a.TrangThai == false
                             orderby a.NgayThiDau descending
                             select new LichThiDau
                             {
                                 TenClbNha = b.TenClb,
                                 TenClbKhach = c.TenClb, 
                                 StartTime = a.NgayThiDau
                             }).OrderByDescending(a => a.StartTime).Take(10).ToList();
            return View(listMatch);
        }
    }
}

public class LichThiDau
{
    public String TenClbNha;
    public String TenClbKhach;
    public DateTime? StartTime;
}