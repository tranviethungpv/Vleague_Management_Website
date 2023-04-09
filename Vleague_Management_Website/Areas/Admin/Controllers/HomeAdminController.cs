using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;
using Vleague_Management_Website.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Vleague_Management_Website.Areas.Admin.Controllers
{
    [Area("admin")]
    [Route("admin")]
    [Route("admin/homeadmin")]
    public class HomeAdminController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        [Route("")]
        [Route("index")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("TranDau")]
        public IActionResult TranDau()
        {
            var listClb = db.Caulacbos.Select(x => x).ToList();
            var listSVD = db.Sanvandongs.Select(x => x).ToList();
            var objectModel = new
            {
                listClb,
                listSVD
            };
            return View(objectModel);
        }

        [Route("SetKetQua")]
        public IActionResult SetKetQua()
        {
            var listClb = db.Caulacbos.Select(x => x).ToList();
            var listSVD = db.Sanvandongs.Select(x => x).ToList();
            var objectModel = new
            {
                listClb,
                listSVD
            };
            return View(objectModel);
        }

        [Route("TranDauCauThu")]
        public IActionResult TranDauCauThu()
        {
            var listTrandau = (from a in db.Trandaus
                               join b in db.Caulacbos on a.Clbnha equals b.CauLacBoId
                               join c in db.Caulacbos on a.Clbkhach equals c.CauLacBoId
                               join d in db.Sanvandongs on a.SanVanDongId equals d.SanVanDongId
                               //where a.TrangThai == false
                               orderby a.NgayThiDau descending
                               select new
                               {
                                   a.TranDauId,
                                   a.NgayThiDau,
                                   clbkhach = b.TenClb,
                                   clbnha = c.TenClb,
                                   d.TenSan,
                                   a.Vong,
                                   a.HiepPhu,
                                   a.KetQua,
                                   a.TrangThai
                               })
                              .ToList();
            var listCauThu = (from a in db.Cauthus
                              select new
                              {
                                  a.CauThuId,
                                  a.HoVaTen,
                              }).ToList();
            var objectModel = new
            {
                listCauThu,
                listTrandau,
            };
            return View(objectModel);
        }


        [Route("Users")]
        public IActionResult Users()
        {
            var user = db.NguoiDungs.Select(x => x).ToList();
            return View(user);
        }
        [Route("Accounts")]
        public IActionResult Accounts()
        {
            
            return View();
        }

    }
}
