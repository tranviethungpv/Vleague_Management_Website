using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Vleague_Management_Website.Models;

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

        [Route("CLB")]
        public IActionResult CLB()
        {
            var lstCLB = db.Caulacbos.ToList();
            return View(lstCLB);
        }

        [Route("SVD")]
        public IActionResult SVD()
        {
            var lstSVD = db.Sanvandongs.ToList();
            return View(lstSVD);
        }
    }
}
