using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class APIDanhSachGhiBan : Controller
	{
		QlbongDaContext db = new QlbongDaContext();
		[HttpGet]
		[Route("getDsById")]
		public IActionResult GetDanhSachGhiBanById(string trandauid)
		{
			var record = (from a in db.TrandauGhibans
						  join b in db.Cauthus on a.CauThuId equals b.CauThuId
						  join c in db.Caulacbos on b.CauLacBoId equals c.CauLacBoId
						  where a.TranDauId == trandauid
						  select new
						  {
							  a.TranDauId,
							  a.CauThuId,
							  b.HoVaTen,
							  b.Anhdaidien,
							  a.ThoiDiemGhiBan,
							  c.TenClb,
						  }).ToList();
			return Ok(record);
		}
	}
}
