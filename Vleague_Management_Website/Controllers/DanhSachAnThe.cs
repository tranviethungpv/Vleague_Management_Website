using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    public class DanhSachAnThe : Controller
    {   
        QlbongDaContext db = new QlbongDaContext();
        public IActionResult Index()
        {


            var result = (from a in db.Cauthus
                          join b in db.TrandauCauthus on a.CauThuId equals b.CauThuId
                          group b by b.CauThuId into g
                         select new
                         {
                             cauthuid = g.Key,
                             tencauthu = g.FirstOrDefault().CauThu.HoVaTen,
                             sothevang = g.Sum(x => x.TheVang),
                             sothedo   = g.Sum(x => x.TheDo)
                         }).ToList().OrderByDescending((x => x.sothevang));
            Console.WriteLine(result);
            return View(result);
        }
    }
}

