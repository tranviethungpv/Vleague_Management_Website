using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIUserController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult getAllUsers([Range(1, 100)] int pageSize = 20,
            [Range(1, int.MaxValue)] int pageNumber = 1)
        {
            var lstUser = db.NguoiDungs.Select(x => x).Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize).ToList();
            return Ok(lstUser);
        }

        [HttpGet]
        [Route("getById")]
        public IActionResult getUserbyId(string id)
        {
            return Ok(db.NguoiDungs.Find(id));
        }

        [HttpPost]
        [Route("AddUser")]
        public IActionResult InsertUser([FromBody] NguoiDung input)
        {
            var idcheck = db.NguoiDungs.Where(x => x.NguoiDungId == input.NguoiDungId).FirstOrDefault();
            if (idcheck != null)
            {
                return BadRequest("Da ton tai id");
            }
            var acccheck = db.TaiKhoans.Find(input.TenDangNhap);
            if (acccheck == null)
            {
                return BadRequest("Tai khoan khong ton tai");
            }
            NguoiDung user = new NguoiDung
            {
                NguoiDungId= input.NguoiDungId,
                TenDangNhap= input.TenDangNhap,
                HoTen = input.HoTen,
                Email = input.Email,
                Sđt = input.Sđt
            };
            db.NguoiDungs.Add(user);
            db.SaveChanges();
            return Ok(user);
        }
        [HttpDelete]
        [Route("deleteUs")]
        public IActionResult Delete(string id)
        {

            if (db.NguoiDungs.Find(id) == null)
                return BadRequest("Không có người dùng này");

            db.TinTucs.RemoveRange(db.TinTucs.Where(x => x.NguoiDungId == id));

            db.NguoiDungs.Remove(db.NguoiDungs.Find(id));

            db.SaveChanges();
            return Ok("Delete ok");
        }

        [HttpPut]
        public IActionResult Update([FromBody] NguoiDung input)
        {

            if (db.TaiKhoans.Find(input.TenDangNhap) == null)
            {
                return BadRequest("Khong ton tai tai khoan nay");
            }
            db.NguoiDungs.Update(input);
            db.SaveChanges();
            return Ok(input);
        }
    }
}
