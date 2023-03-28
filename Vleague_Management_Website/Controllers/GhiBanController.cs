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
                          join c in db.Caulacbos on a.CauLacBoId equals c.CauLacBoId
                          group b by b.CauThuId into g
                          select new
                          {
                              cauthuid = g.Key,
                              tencauthu = g.FirstOrDefault().CauThu.HoVaTen,
                              sobanthang = g.Count(),
                              caulacbo = g.FirstOrDefault().CauLacBo.TenClb
                          }).ToList().OrderByDescending((x => x.sobanthang));
            Console.WriteLine(result);
            return View(result);
        }
    }
}