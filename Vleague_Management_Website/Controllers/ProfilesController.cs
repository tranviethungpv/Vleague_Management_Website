using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;
using X.PagedList;

namespace Vleague_Management_Website.Controllers
{
	public class ProfilesController : Controller
	{
		QlbongDaContext db = new QlbongDaContext();
		public IActionResult Index(int ? page)
		{
			int pageSize = 8;
			int pageNumber = page == null || page < 0 ? 1 : page.Value;
			var listCT = db.Cauthus.OrderBy(x => x.CauThuId).ToList();
			PagedList<Cauthu> lst = new PagedList<Cauthu>(listCT, pageNumber, pageSize);
			return View(lst);
		}
		public IActionResult ThongTinCauThu(string CauThu)
		{
			var product = db.Cauthus.SingleOrDefault(x => x.CauThuId == CauThu);
			//var imageProduct = db.Cauthus.Where(x => x.CauThuId == CauThu).ToList();
			//ViewBag.imageProduct = imageProduct;
			if (product == null)
			{
				return NotFound();
			}
			return View(product);
		}

	}
}