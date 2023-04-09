using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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
		[Route("TinTuc")]
		public IActionResult TinTuc()
		{
			var listTinTuc = db.TinTucs.Select(x => x).ToList();
			return View(listTinTuc);
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
		[Route("SVD")]
		public IActionResult SVD()
		{
			var lstSVD = db.Sanvandongs.ToList();
			return View(lstSVD);
		}
	}
}
