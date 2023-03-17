using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Vleague_Management_Website.Models;
using X.PagedList;

namespace Vleague_Management_Website.Controllers
{
    public class HomeController : Controller
    {
       QlbongDaContext db = new QlbongDaContext();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        
        public IActionResult Index()
        {
            List<Caulacbo> lstCauLacBo = db.Caulacbos.ToList();
            List<global::LeaderBoard> lstBangXepHang = new List<global::LeaderBoard>();
            foreach (var item in lstCauLacBo)
            {
                List<Trandau> lstTranDau = db.Trandaus.Where(x => x.Clbnha == item.CauLacBoId).ToList();
                var soTranThang = 0;
                var soTranThua = 0;
                var soTranHoa = 0;
                var diem = 0;

                foreach (var item1 in lstTranDau)
                {
                    string[] ketqua = item1.KetQua.Split("-"); // tách chuỗi bằng dấu '-' vd: 2-1
                    var banThangDoiNha = int.Parse(ketqua[0]); // gán 2 cho banthangdoinha
                    var banThangDoiKhach = int.Parse(ketqua[1]); // gán 1 cho doikhach
                    if (banThangDoiNha > banThangDoiKhach)
                    {
                        soTranThang += 1;
                    }
                    if (banThangDoiNha < banThangDoiKhach)
                    {
                        soTranThua += 1;
                    }
                    if (banThangDoiNha == banThangDoiKhach)
                    {
                        soTranHoa += 1;
                    }
                }
                diem = soTranThang * 3 + soTranHoa;
                lstBangXepHang.Add(new global::LeaderBoard
                {
                    TenClb = item.TenClb,
                    SoTranThang = soTranThang,
                    SoTranHoa = soTranHoa,
                    SoTranThua = soTranThua,
                    Diem = diem,
                });

            }
            var lstBangXepHangSort = lstBangXepHang.OrderByDescending(x => x.Diem).ToList();
            return View(lstBangXepHangSort);
        
        }
        public IActionResult ChiTietCauThu(string macauthu)
        {
            var cauthu = db.Cauthus.SingleOrDefault(x=>x.CauThuId==macauthu);
            return View(cauthu);
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
public class LeaderBoard // để hứng giá tri
{
    public String TenClb;
    public int SoTranThang;
    public int SoTranThua;
    public int SoTranHoa;
    public int Diem;

}

