using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

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
        public IActionResult Index()
        {
            return View();
        }
        [Route("TinTuc")]
        public IActionResult TinTuc()
        {
            var listTinTuc = db.TinTucs.Select(x => x).ToList();
            return View(listTinTuc);
        }
    }
}
