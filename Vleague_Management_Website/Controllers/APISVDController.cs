using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APISVDController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllSVD([Range(1, 100)] int pageSize = 20,
            [Range(1, int.MaxValue)] int pageNumber = 1)
        {
            var listSVD = (from a in db.Sanvandongs
                              select new
                              {
                                  a.SanVanDongId,
                                  a.TenSan,
                                  a.ThanhPho,
                                  a.NamBatDau,
                              })
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
            return Ok(listSVD);
        }

        [Route("getById")]
        [HttpGet]
        public IActionResult GetSVDId(string id)
        {
            var SanVanDong = (from a in db.Sanvandongs
                              where a.SanVanDongId == id
                          select new
                          {
                              a.SanVanDongId,
                              a.TenSan,
                              a.ThanhPho,
                              a.NamBatDau,
                          })
                              .FirstOrDefault();
            return Ok(SanVanDong);
        }

        [HttpPost]
        public IActionResult AddSVD([FromBody] SVDCreateInputModel input)
        {
            var SVDCheck = (from a in db.Sanvandongs
                            where a.SanVanDongId == input.SanVanDongId
                            select a).ToList();
            if (SVDCheck.Count>0)
            {
                return BadRequest("Da ton tai SanVanDongId!");
            }

            var newSanvandong = new Sanvandong
            {
                SanVanDongId = input.SanVanDongId.Trim(),
                TenSan = input.TenSan,
                ThanhPho = input.ThanhPho,
                NamBatDau = input.NamBatDau,
            };

            db.Sanvandongs.Add(newSanvandong);
            db.SaveChanges();
            return Ok(input);
        }
        [HttpPut]
        public IActionResult UpdateSVD([FromBody] SVDUpdateInputModel input)
        {
            var sanvandong = (from a in db.Sanvandongs
                          where a.SanVanDongId == input.SanVanDongId
                          select a).FirstOrDefault();
            if (sanvandong == null)
            {
                return BadRequest("Khong tim thay SVD");
            }
            sanvandong.TenSan = input.TenSan;
            sanvandong.ThanhPho = input.ThanhPho;
            sanvandong.NamBatDau = input.NamBatDau;

            db.Sanvandongs.Update(sanvandong);
            db.SaveChanges();

            return Ok(input);
        }
        [HttpDelete]
        public IActionResult DeleteSVD(string input)
        {
            var SVDCheck = (from a in db.Sanvandongs
                               where a.SanVanDongId == input
                               select a).FirstOrDefault();

            if (SVDCheck == null)
            {
                return BadRequest("Khong tim thay san van dong!");
            }

            db.Sanvandongs.Remove(SVDCheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}