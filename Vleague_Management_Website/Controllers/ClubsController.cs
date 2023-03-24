using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using Vleague_Management_Website.Models;
using X.PagedList;

namespace Vleague_Management_Website.Controllers
{
	public class ClubsController : Controller
	{
		QlbongDaContext db = new QlbongDaContext();
		public IActionResult Index(int? page)
		{
			int pageSize = 8;
			int pageNumber = page == null || page < 0 ? 1 : page.Value;
			var listClb = db.Caulacbos.OrderBy(x => x.CauLacBoId).ToList();
			PagedList<Caulacbo> lst = new PagedList<Caulacbo>(listClb, pageNumber, pageSize);
			return View(lst);
		}
		public IActionResult ChiTietClub(string clubid)
		{
			var listClub = (from a in db.Caulacbos
							 join b in db.Sanvandongs on a.SanVanDongId equals b.SanVanDongId
							 join c in db.Huanluyenviens on a.HuanLuyenVienId equals c.HuanLuyenVienId
							 where a.CauLacBoId == clubid
							 select new ChiTietCauLacBo
							 {
								 TenClb = a.TenClb,
								 TenGoi = a.TenGoi,
								 Sanvandong = b.TenSan,
								 Huanluyenvien = c.TenHlv
							 }).ToList();
			return View(listClub);
		}
		public class ChiTietCauLacBo
		{
			public String? TenClb;
			public String? TenGoi;
			public String? Sanvandong;
			public String? Huanluyenvien;
		}
	}
}
