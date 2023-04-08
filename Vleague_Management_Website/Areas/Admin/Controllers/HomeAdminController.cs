using Microsoft.AspNetCore.Mvc;
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
            var listtrandauactive = db.Trandaus.Where(x => x.TrangThai == false);
            return View(listtrandauactive);
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
