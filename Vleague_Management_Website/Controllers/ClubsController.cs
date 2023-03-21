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
		public IActionResult Index(int ? page)
		{
			int pageSize = 1;
			int pageNumber = page == null || page < 0 ? 1 : page.Value;
			var listClubs = db.Caulacbos.OrderBy(x => x.CauLacBoId).ToList();
			PagedList<Caulacbo> lst = new PagedList<Caulacbo>(listClubs, pageNumber, pageSize);
			//var imageProduct = db.TAnhSps.Where(x => x.MaSp == masanpham).ToList();
			//ViewBag.imageProduct = imageProduct;
			//if (product == null)
			//{
			//	return NotFound();
			//}
			return View(lst);
		}
	}
}
