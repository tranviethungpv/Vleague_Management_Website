using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vleague_Management_Website.Models;
using X.PagedList;

namespace Vleague_Management_Website.Controllers
{
    public class NewsController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        public IActionResult Index(int? page)
        {
            int pageSize = 8;
            int pageNumber = page == null || page < 0 ? 1 : page.Value;
            var lstnews = db.TinTucs.AsNoTracking().OrderBy(x => x.TieuDe);
            PagedList<TinTuc> lst = new PagedList<TinTuc>(lstnews, pageNumber, pageSize);

            return View(lst);
        }
        public IActionResult DetailNews (string Id)
        {
            var TinTuc = (from a in db.TinTucs
                          join b in db.TaiKhoans on a.TenDangNhap equals b.TenDangNhap
                          select new TinTucUser
                          {
                              TinTucId = a.TinTucId,
                              TieuDe = a.TieuDe,
                              NoiDung = a.NoiDung,
                              NgayTao = a.NgayTao,
                              TenNguoiDung = b.TenDangNhap,
                              Anhdaidien = a.Anhdaidien,
                          }).SingleOrDefault(x=>x.TinTucId==Id);
            ViewBag.Title = TinTuc.TieuDe;
            return View(TinTuc);
        }
        public class TinTucUser
        {
            public string TinTucId { get; set; } = null!;

            public string? TieuDe { get; set; }

            public string? NoiDung { get; set; }

            public DateTime? NgayTao { get; set; }

            public string? TenNguoiDung { get; set; }
            public string? Anhdaidien { get; set; }
        }
    }
}
