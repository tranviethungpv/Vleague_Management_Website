using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;
using System.Drawing.Printing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APICLBController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllCLB()
        {
            var query = (from a in db.Caulacbos
                           join b in db.Huanluyenviens on a.HuanLuyenVienId equals b.HuanLuyenVienId
                           join c in db.Sanvandongs on a.SanVanDongId equals c.SanVanDongId
                           select new
                           {
                               a.CauLacBoId,
                               a.TenClb,
                               a.TenGoi,
                               c.TenSan,
                               b.TenHlv,
                               //a.AnhDaiDien
                           });
            var totalCount = query.Count();
            //var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var listCLB = query
                .ToList();

            var result = new
            {
                TotalCount = totalCount,
                //PageCount = pageCount,
                Items = listCLB
            };

            return Ok(result);
        }
        [HttpGet]
        [Route("getPagination")]
        public IActionResult GetAllCLBPagination([Range(1, 100)] int pageSize,
            [Range(1, int.MaxValue)] int pageNumber)
        {
            var listCLB = (from a in db.Caulacbos
                           join b in db.Huanluyenviens on a.HuanLuyenVienId equals b.HuanLuyenVienId
                           join c in db.Sanvandongs on a.SanVanDongId equals c.SanVanDongId
                           select new
                           {
                               a.CauLacBoId,
                               a.TenClb,
                               a.TenGoi,
                               c.TenSan,
                               b.TenHlv,
                               //a.AnhDaiDien
                           })
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
            var result = new
            {
                Items = listCLB
            };

            return Ok(result);
        }
        [Route("getById")]
        [HttpGet]
        public IActionResult GetCLBId(string id)
        {
            var CLB = (from a in db.Caulacbos
                       join b in db.Huanluyenviens on a.HuanLuyenVienId equals b.HuanLuyenVienId
                       join c in db.Sanvandongs on a.SanVanDongId equals c.SanVanDongId
                       where a.CauLacBoId == id
                       select new
                       {
                           a.CauLacBoId,
                           a.TenClb,
                           a.TenGoi,
                           c.TenSan,
                           b.TenHlv,
                           a.HuanLuyenVienId,
                           a.SanVanDongId,
                           //a.AnhDaiDien
                       })
                              .FirstOrDefault();
            return Ok(CLB);
        }
        [HttpPost]
        public IActionResult AddCLB([FromBody] CLBCreateInputModel input)
        {
            var CLBcheck = db.Caulacbos.Where(x => x.CauLacBoId == input.CauLacBoId).ToList();
            if (CLBcheck.Count > 0)
            {
                return BadRequest("Da Ton Tai CLB ID!");
            }
            var hlvcheck = db.Huanluyenviens.Where(x => x.HuanLuyenVienId == input.HuanLuyenVienId).ToList();
            if (hlvcheck.Count <= 0)
            {
                return BadRequest("Khong ton tai HLV");
            }
            var newCLB = new Caulacbo
            {
                CauLacBoId = input.CauLacBoId,
                TenClb = input.TenClb,
                TenGoi = input.TenGoi,
                SanVanDongId = input.SanVanDongId,
                HuanLuyenVienId = input.HuanLuyenVienId,
                //AnhDaiDien = input.AnhDaiDien,
            };

            db.Caulacbos.Add(newCLB);
            db.SaveChanges();

            return Ok(input);
        }

        [HttpPut]
        public IActionResult UpdateCLB([FromBody] CLBUpdateInputModel input)
        {
            var CLBForUpdate = (from a in db.Caulacbos
                                where a.CauLacBoId == input.CauLacBoId
                                select a).FirstOrDefault();
            if (CLBForUpdate == null)
            {
                return BadRequest("Khong tim thay CLB");
            }
            CLBForUpdate.TenClb = input.TenClb;
            CLBForUpdate.TenGoi = input.TenGoi;
            CLBForUpdate.HuanLuyenVienId = input.HuanLuyenVienId;
            CLBForUpdate.SanVanDongId = input.SanVanDongId;
            //CLBForUpdate.AnhDaiDien = input.AnhDaiDien;
            db.Caulacbos.Update(CLBForUpdate);
            db.SaveChanges();

            return Ok(input);
        }
        [HttpDelete]
        public IActionResult DeleteCLB(string input)
        {
            var CLBcheck = (from a in db.Caulacbos
                            where a.CauLacBoId == input
                            select a).FirstOrDefault();


            if (CLBcheck == null)
            {
                return BadRequest("Khong tim thay CLB!");
            }
            

            db.Caulacbos.Remove(CLBcheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}
