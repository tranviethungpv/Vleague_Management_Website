using Microsoft.AspNetCore.Mvc;
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
        [Route("HLV")]
        public IActionResult HLV()
        {
            return View();
        }
        [Route("TranDauGhiBan")]
        public IActionResult TranDauGhiBan()
        {
            //var lstMatch = db.Trandaus.Where(x => x.TrangThai == true).ToList();
            return View();
        }  
}
