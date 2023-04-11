using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIHuanLuyenVienController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllHLV()
        {
            var query = (from a in db.Huanluyenviens
                           orderby a.NamSinh descending
                           select new
                           {
                               a.HuanLuyenVienId,
                               a.TenHlv,
                               a.NamSinh,
                               a.QuocTich,
                           });
            var totalCount = query.Count();
            //var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var listHLV = query
                .ToList();

            var result = new
            {
                TotalCount = totalCount,
                //PageCount = pageCount,
                Items = listHLV
            };

            return Ok(result);
        }
        [HttpGet]
        [Route("getPagination")]
        public IActionResult GetAllHLVPagination([Range(1, 100)] int pageSize,
            [Range(1, int.MaxValue)] int pageNumber)
        {
            var listHLV = (from a in db.Huanluyenviens
                           orderby a.NamSinh descending
                           select new
                           {
                               a.HuanLuyenVienId,
                               a.TenHlv,
                               a.NamSinh,
                               a.QuocTich,
                           })
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
            var result = new
            {
                Items = listHLV
            };

            return Ok(result);
        }
        [Route("getById")]
        [HttpGet]
        public IActionResult GetHuanLuyenVienId(string id)
        {
            var HLV = (from a in db.Huanluyenviens
                       where a.HuanLuyenVienId == id
                       select new
                       {
                           a.HuanLuyenVienId,
                           a.TenHlv,
                           a.NamSinh,
                           a.QuocTich,
                       })
                              .FirstOrDefault();
            return Ok(HLV);
        }
        [HttpPost]
        public IActionResult AddHuanLuyenVien([FromBody] HuanLuyenVienCreateInputModel input)
        {
            var HLVcheck = db.Huanluyenviens.Where(x => x.HuanLuyenVienId == input.HuanLuyenVienId).ToList();
            if (HLVcheck.Count > 0)
            {
                return BadRequest("Da Ton Tai HLV ID!");
            }
            var newHLV = new Huanluyenvien
            {
                HuanLuyenVienId = input.HuanLuyenVienId,
                TenHlv = input.TenHlv,
                NamSinh = input.NamSinh,
                QuocTich = input.QuocTich
            };

            db.Huanluyenviens.Add(newHLV);
            db.SaveChanges();

            return Ok(input);
        }

        [HttpPut]
        public IActionResult UpdateHuanLuyenVien([FromBody] HuanLuyenVienUpdateInputModel input)
        {
            var HLVForUpdate = (from a in db.Huanluyenviens
                                where a.HuanLuyenVienId == input.HuanLuyenVienId
                                select a).FirstOrDefault();
            if (HLVForUpdate == null)
            {
                return BadRequest("Khong tim thay HLV");
            }
            HLVForUpdate.TenHlv = input.TenHlv;
            HLVForUpdate.NamSinh = input.NamSinh;
            HLVForUpdate.QuocTich = input.QuocTich;
            db.Huanluyenviens.Update(HLVForUpdate);
            db.SaveChanges();

            return Ok(input);
        }
        [HttpDelete]
        public IActionResult DeleteHuanLuyenVien(string input)
        {
            var HLVcheck = (from a in db.Huanluyenviens
                            where a.HuanLuyenVienId == input
                            select a).FirstOrDefault();

            var ClubCheck = (from a in db.Caulacbos
                             where a.HuanLuyenVienId == input
                             select a).ToList();

            if (HLVcheck == null)
            {
                return BadRequest("Khong tim thay HLV!");
            }

            if (ClubCheck.Count > 0)
            {
                return BadRequest("Khong the xoa HLV!");
            }

            db.Huanluyenviens.Remove(HLVcheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}
