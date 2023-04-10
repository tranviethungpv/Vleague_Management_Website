using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;
using Vleague_Management_Website.Models.Authenciation;

namespace Vleague_Management_Website.Areas.Writer.Controllers
{
    [Area("writer")]
    [Route("writer")]
    [Route("writer/homewriter")]
    public class HomeWriterController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        [Route("")]
        [Route("index")]
        [Authenciation_Writer]
        public IActionResult Index()
        {
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            return View();
        }
        [Route("TinTuc")]
        [Authenciation_Writer]
        public IActionResult TinTuc()
        {
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            var listTinTuc = db.TinTucs.Select(x => x).ToList();
            return View(listTinTuc);
        }
    }
}
