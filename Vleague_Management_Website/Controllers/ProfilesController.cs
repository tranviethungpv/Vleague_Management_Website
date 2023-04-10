using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Vleague_Management_Website.Models;
using X.PagedList;

namespace Vleague_Management_Website.Controllers
{
	public class ProfilesController : Controller
	{
		QlbongDaContext db = new QlbongDaContext();
		public IActionResult Index(int ? page)
		{
			int pageSize = 16;
			int pageNumber = page == null || page < 0 ? 1 : page.Value;
			var listCT = db.Cauthus.OrderBy(x => x.CauThuId).ToList();
			PagedList<Cauthu> lst = new PagedList<Cauthu>(listCT, pageNumber, pageSize);
			return View(lst);
		}
		public IActionResult ChiTietCauThu(string CauThu)
		{
			var detail = (from a in db.Cauthus
						  join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
						  select new CauthuClb
						  {
							  CauThuId = a.CauThuId,
							  HoVaTen = a.HoVaTen,
							  ViTri = a.ViTri,
							  Ngaysinh = a.Ngaysinh,
							  QuocTich = a.QuocTich,
							  CauLacBo = b.TenClb,
							  CanNang = a.CanNang,
							  SoAo = a.SoAo,
							  ChieuCao = a.ChieuCao,
							  Anhdaidien = a.Anhdaidien,
						  }).SingleOrDefault(x => x.CauThuId == CauThu);
			//var imageProduct = db.Cauthus.Where(x => x.CauThuId == CauThu).ToList();
			//ViewBag.imageProduct = imageProduct;
			if (detail == null)
			{
				return NotFound();
			}
			return View(detail);
		}
	}
	public class CauthuClb
	{
		public string CauThuId { get; set; } = null!;

		public string? HoVaTen { get; set; }

		public string? CauLacBoId { get; set; }

		public DateTime? Ngaysinh { get; set; }

		public string? ViTri { get; set; }

		public string? QuocTich { get; set; }

		public string? SoAo { get; set; }

		public double? CanNang { get; set; }

		public double? ChieuCao { get; set; }

		public string? Anhdaidien { get; set; }

		public string? CauLacBo { get; set; }
	}
}