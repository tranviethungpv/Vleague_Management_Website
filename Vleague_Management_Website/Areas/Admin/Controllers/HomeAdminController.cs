using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Areas.Admin.Controllers
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
        [Route("CauThu")]
        public IActionResult CauThu()
        {
            var listCLB = db.Caulacbos.ToList();
            return View(listCLB);
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
                [Route("CLB")]
        public IActionResult CLB()
        {
            //var lstCLB = db.Caulacbos.ToList();
            var lstHlv = db.Huanluyenviens.ToList();
            var lstSvd = db.Sanvandongs.ToList();
            var objectModel = new
            {
                lstHlv,
                lstSvd
            };
            return View(objectModel);
        }

        [Route("SVD")]
        public IActionResult SVD()
        {
            var lstSVD = db.Sanvandongs.ToList();
            return View(lstSVD);
        }
}
