using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    public class GhiBanController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        public IActionResult Index()
        {


            var result = (from a in db.Cauthus
                          join b in db.TrandauGhibans on a.CauThuId equals b.CauThuId
                          group b by b.CauThuId into g
                          select new
                          {
                              cauthuid = g.Key,
                              tencauthu = g.FirstOrDefault().CauThu.HoVaTen,
                              sobanthang = g.Sum(x => x.ThoiDiemGhiBan),
                          }).ToList().OrderByDescending((x => x.sobanthang));
            Console.WriteLine(result);
            return View(result);
        }
    }
}