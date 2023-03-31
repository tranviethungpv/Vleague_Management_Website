using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APILichThiDauController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpPost]
        public IActionResult AddLichThiDau([FromBody] LichThiDauCreateInputModel input)
        {
            var tranDauCheck = db.Trandaus.Select(x => x.TranDauId).ToList();
            var sanvandongCheck = db.Sanvandongs.Select(x => x.SanVanDongId).ToList();
            var clbCheck = db.Caulacbos.Select(x => x.CauLacBoId).ToList();
            if (tranDauCheck.Any(x => x.Contains(input.TranDauId)))
            {
                return BadRequest("Da ton tai TranDauId");
            }
            if (!sanvandongCheck.Any(x => x.Contains(input.SanVanDongId)))
            {
                return BadRequest("Khong ton tai san van dong nay!");
            }
            if (input.Clbnha == input.Clbkhach)
            {
                return BadRequest("Khong duoc dat 2 clb trung nhau");
            }
            if (!clbCheck.Any(x => x.Contains(input.Clbnha)) || !clbCheck.Any(x => x.Contains(input.Clbkhach)))
            {
                return BadRequest("Khong ton tai cau lac bo");
            }

            var newMatch = new Trandau
            {
                TranDauId = input.TranDauId,
                Clbnha = input.Clbnha,
                Clbkhach = input.Clbkhach,
                NgayThiDau = input.NgayThiDau,
                SanVanDongId = input.SanVanDongId,
                Vong = input.Vong,
                TrangThai = false
            };

            db.Trandaus.Add(newMatch);
            db.SaveChanges();

            return Ok(input);
        }

        [HttpPut]
        public IActionResult UpdateLichThiDau([FromBody] LichThiDauUpdateInputModel input)
        {
            var tranDau = (from a in db.Trandaus
                           where a.TranDauId == input.TranDauId
                           select a).FirstOrDefault();
            if (tranDau == null)
            {
                return BadRequest("Khong tim thay tran dau");
            }
            if (tranDau.TrangThai == true)
            {
                return BadRequest("Trang thai khong cho phep");
            }
            var sanvandongCheck = db.Sanvandongs.Select(x => x.SanVanDongId).ToList();
            var clbCheck = db.Caulacbos.Select(x => x.CauLacBoId).ToList();
            if (!sanvandongCheck.Any(x => x.Contains(input.SanVanDongId)))
            {
                return BadRequest("Khong ton tai san van dong nay!");
            }
            if (input.Clbnha == input.Clbkhach)
            {
                return BadRequest("Khong duoc dat 2 clb trung nhau");
            }
            if (!clbCheck.Any(x => x.Contains(input.Clbnha)) || !clbCheck.Any(x => x.Contains(input.Clbkhach)))
            {
                return BadRequest("Khong ton tai cau lac bo");
            }

            tranDau.NgayThiDau = input.NgayThiDau;
            tranDau.Clbkhach = input.Clbkhach;
            tranDau.Clbnha = input.Clbnha;
            tranDau.SanVanDongId = input.SanVanDongId;
            tranDau.Vong = input.Vong;

            db.Trandaus.Update(tranDau);
            db.SaveChanges();

            return Ok(input);
        }

        [Route("setKetQua")]
        [HttpPut]
        public IActionResult setKetQua([FromBody] SetKetQuaThiDauInputModel input)
        {
            var tranDau = (from a in db.Trandaus
                           where a.TranDauId == input.TranDauId
                           select a).FirstOrDefault();
            if (tranDau == null)
            {
                return BadRequest("Khong tim thay tran dau");
            }
            
            tranDau.HiepPhu = input.HiepPhu;
            tranDau.KetQua = input.KetQua;
            tranDau.TrangThai = true;

            db.Trandaus.Update(tranDau);
            db.SaveChanges();

            return Ok(input);
        }

        [HttpDelete]
        public IActionResult DeleteLichThiDau(string input)
        {
            var tranDauCheck = (from a in db.Trandaus
                               where a.TranDauId == input
                               select a).FirstOrDefault();

            if(tranDauCheck == null)
            {
                return BadRequest("Khong tim thay tran dau");
            }
            if(tranDauCheck.TrangThai == true)
            {
                return BadRequest("Trang thai khong cho phep xoa");
            }

            db.Trandaus.Remove(tranDauCheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}
