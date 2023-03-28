using Vleague_Management_Website.Models;
using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Repository;

namespace Vleague_Management_Website.ViewComponents
{
	public class CauThuViewComponent: ViewComponent
	{
		private readonly ICauThuRepository _cauThuRepository;
		public CauThuViewComponent(ICauThuRepository cauThuRepository)
		{
			_cauThuRepository = cauThuRepository;
		}
		public IViewComponentResult Invoke()
		{
			var cauthu = _cauThuRepository.GetAllTinTuc().OrderBy(x => x.CauThuId).Take(4);
			return View(cauthu);
		}
	}
}
