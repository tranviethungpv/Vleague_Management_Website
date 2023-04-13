using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Vleague_Management_Website.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Vleague_Management_Website.Models.Authenciation;

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
        [Authenciation_Admin]
        public IActionResult Index()
		{
			string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
			ViewBag.TenDangNhap = TenDangNhap;
            return View();
		}

		[Route("DSTDau")]
        [Authenciation_Admin]
        public IActionResult DSTDau()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
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
        [Authenciation_Admin]
        public IActionResult SetKetQua()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
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
        [Authenciation_Admin]
        public IActionResult CauThu()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            var listCLB = db.Caulacbos.ToList();
			return View(listCLB);
		}
		[Route("HLV")]
        [Authenciation_Admin]
        public IActionResult HLV()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            return View();
		}
		[Route("GhiBanTranDau")]
        [Authenciation_Admin]
        public IActionResult GhiBanTranDau()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            //var lstMatch = db.Trandaus.Where(x => x.TrangThai == true).ToList();
            return View();
		}
		[Route("CLB")]
        [Authenciation_Admin]
        public IActionResult CLB()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
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
		[Route("CauThuTran")]
        [Authenciation_Admin]
        public IActionResult CauThuTran()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
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
		[Route("TinTuc")]
        [Authenciation_Admin]
        public IActionResult TinTuc()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            var listTinTuc = db.TinTucs.Select(x => x).ToList();
			return View(listTinTuc);
		}
		[Route("Accounts")]
        [Authenciation_Admin]
        public IActionResult Accounts()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            return View();
		}
		[Route("SVD")]
        [Authenciation_Admin]
        public IActionResult SVD()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
            var lstSVD = db.Sanvandongs.ToList();
			return View(lstSVD);
		}
        [Route("DanhSachGhiBan")]
        [Authenciation_Admin]
		public IActionResult DanhSachGhiBan()
		{
            string TenDangNhap = HttpContext.Session.GetString("TenDangNhap");
            ViewBag.TenDangNhap = TenDangNhap;
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
			var objectModel = new
			{
				listTrandau,
			};
			return View(objectModel);
        }
    }
}
