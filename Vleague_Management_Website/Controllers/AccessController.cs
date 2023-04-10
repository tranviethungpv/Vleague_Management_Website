using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using Vleague_Management_Website.Models;

namespace ThucHanhWeb.Controllers
{
    public class AccessController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]


        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("TenDangNhap") == null)
            {
                return View();
            }
            else
            {
                if(HttpContext.Session.GetString("LoaiTaiKhoan") == "0")
                {
                    return RedirectToAction("Index", "Admin");
                }   
                else
                {
                    return RedirectToAction("Index", "Writer");
                }
                    
            }
        }

        [HttpPost]
        public IActionResult Login(TaiKhoan user)
        {
            if (HttpContext.Session.GetString("TenDangNhap") == null)
            {
                var u = db.TaiKhoans.Where(x => x.TenDangNhap.Equals(user.TenDangNhap) && x.MatKhau.Equals(user.MatKhau)).FirstOrDefault();
                if (u != null)
                {
                    HttpContext.Session.SetString("LoaiTaiKhoan",u.LoaiTaiKhoan.ToString());
                    HttpContext.Session.SetString("TenDangNhap", u.TenDangNhap.ToString());
                    if (u.LoaiTaiKhoan == 0)
                    {
						return RedirectToAction("Index", "Admin");
					}    
                    else if(u.LoaiTaiKhoan == 1)
                    {
                        return RedirectToAction("Index", "Writer");
                    }
                }
                else
                {
                    return View();
                }
            }

            return RedirectToAction("Index", "Admin");

        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            HttpContext.Session.Remove("TenDangNhap");
            HttpContext.Session.Remove("LoaiTaiKhoan");
            return RedirectToAction("Index", "Home");
        }
    }
}
