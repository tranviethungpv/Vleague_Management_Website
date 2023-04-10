using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIAccountController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllAccounts([Range(1, 100)] int pageSize = 20,
            [Range(1, int.MaxValue)] int pageNumber = 1)
        {
            try
            {
                var query = db.TaiKhoans.OrderBy(x => x.TenDangNhap).Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                // Xử lý các lỗi khác nhau
                return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
            }
        }


        [HttpPost]
        public IActionResult AddAccount([FromBody] TaiKhoan input)
        {
            if (input == null)
            {
                return BadRequest("Dữ liệu không hợp lệ");
            }

            using (var db = new QlbongDaContext())
            {
                try
                {
                    var checkacc = db.TaiKhoans.FirstOrDefault(x => x.TenDangNhap == input.TenDangNhap);
                    if (checkacc != null)
                    {
                        return BadRequest("Tài khoản đã tồn tại rồi !");
                    }

                    TaiKhoan acc = new TaiKhoan
                    {
                        LoaiTaiKhoan = input.LoaiTaiKhoan,
                        TenDangNhap = input.TenDangNhap,
                        MatKhau = input.MatKhau
                    };
                    db.TaiKhoans.Add(acc);
                    db.SaveChanges();
                    return Ok(acc);
                }
                catch (Exception ex)
                {
                    // Xử lý các lỗi khác nhau
                    return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
                }
            }
        }

		[HttpGet]
		[Route("getByTDN")]
		public IActionResult GetRecordById( string tendangnhap)
		{
			var record = db.TaiKhoans.FirstOrDefault(x => x.TenDangNhap==tendangnhap);
			return Ok(record);
		}

		[HttpPut]
		public IActionResult UpdateAccount([FromBody] TaiKhoan input)
		{
			if (input == null)
			{
				return BadRequest("Dữ liệu không hợp lệ");
			}

			using (var db = new QlbongDaContext())
			{
				try
				{
					var checkacc = db.TaiKhoans.FirstOrDefault(x => x.TenDangNhap == input.TenDangNhap);
					if (checkacc == null)
					{
						return BadRequest("Tài khoản không tồn tại !");
					}
					checkacc.MatKhau = input.MatKhau;
					checkacc.LoaiTaiKhoan = input.LoaiTaiKhoan;
					db.TaiKhoans.Update(checkacc);
					db.SaveChanges();
					return Ok(checkacc); // Return updated account data
				}
				catch (Exception ex)
				{
					// Xử lý các lỗi khác nhau
					return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
				}
			}
		}

		[HttpDelete]
        public IActionResult DeleteAccount(string tendangnhap)
        {
            try
            {
                var acc = db.TaiKhoans.FirstOrDefault(x => x.TenDangNhap == tendangnhap);
                if (acc==null)
                {
                    return BadRequest("Không có tên đăng nhập này");
                }
                var lstNguoiDung = db.TaiKhoans.Where(x=>x.TenDangNhap == tendangnhap);
                db.TaiKhoans.RemoveRange(lstNguoiDung);
                db.TaiKhoans.Remove(acc); 
                db.SaveChanges();
                return Ok();
            }
            
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi hệ thống: " + ex.Message);
            }
           
        }
    }
}
