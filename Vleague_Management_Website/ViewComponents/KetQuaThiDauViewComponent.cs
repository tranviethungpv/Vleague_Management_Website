using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Repository;

namespace Vleague_Management_Website.ViewComponents
{
    public class KetQuaThiDauViewComponent : ViewComponent
    {
        private readonly KetQuaThiDauRepository _ketquathidauRepository = new KetQuaThiDauRepository();
        public KetQuaThiDauViewComponent() { }
        public IViewComponentResult Invoke()
        {
            var ketquathidau = _ketquathidauRepository.GetKetQuaThiDauObjs();
            return View(ketquathidau);
        }
    }
}
