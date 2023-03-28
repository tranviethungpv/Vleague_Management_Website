using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Repository;

namespace Vleague_Management_Website.ViewComponents
{
    public class NewsViewComponent : ViewComponent
    {
        public NewsRepository _newsRepository;
        public NewsViewComponent(NewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }
        public IViewComponentResult Invoke()
        {
            var news = _newsRepository.GetAllTinTuc().OrderByDescending(x => x.NgayTao).Take(3); 
            return View(news);
        }
    }
}
