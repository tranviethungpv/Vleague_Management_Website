using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Drawing.Printing;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APICauThuController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllCauThu()
        {
            var query = (from a in db.Cauthus
                         join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
                         select new
                         {
                             a.CauThuId,
                             a.HoVaTen,
                             b.CauLacBoId,
                             a.Ngaysinh,
                             a.ViTri,
                             a.QuocTich,
                             a.SoAo,
                             a.CanNang,
                             a.ChieuCao,
                             a.Anhdaidien
                         });
            var totalCount = query.Count();
            //var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var listTranDau = query
                .ToList();

            var result = new
            {
                TotalCount = totalCount,
                //PageCount = pageCount,
                Items = listTranDau
            };

            return Ok(result);

        }
        [HttpGet]
        [Route("getPagination")]
        public IActionResult GetAllCauThuPagination([Range(1, 100)] int pageSize,
            [Range(1, int.MaxValue)] int pageNumber)
        {
            var listCauThu = (from a in db.Cauthus
                              join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
                              select new
                              {
                                  a.CauThuId,
                                  a.HoVaTen,
                                  b.CauLacBoId,
                                  a.Ngaysinh,
                                  a.ViTri,
                                  a.QuocTich,
                                  a.SoAo,
                                  a.CanNang,
                                  a.ChieuCao,
                                  a.Anhdaidien
                              })
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();
            var result = new
            {
                Items = listCauThu
            };
            return Ok(result);
        }

        [Route("getById")]
        [HttpGet]
        public IActionResult GetCauThuId(string id)
        {
            var CauThu = (from a in db.Cauthus
                          join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
                          where a.CauThuId == id
                          select new
                          {
                              a.CauThuId,
                              a.HoVaTen,
                              b.CauLacBoId,
                              a.Ngaysinh,
                              a.ViTri,
                              a.QuocTich,
                              a.SoAo,
                              a.CanNang,
                              a.ChieuCao,
                              a.Anhdaidien
                          })
                              .FirstOrDefault();
            return Ok(CauThu);
        }

        [HttpPost]
        [Route("themcauthu")]
        public async Task<IActionResult> AddCauThu([FromForm] CauThuCreateInputModel input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Upload the image to the server
            string fileName = await UploadImage(input.Image);
            var cauthuCheck = db.Cauthus.Select(x => x.CauThuId).ToList();
            if (cauthuCheck.Any(x => x.Contains(input.CauThuId)))
            {
                return BadRequest("Da ton tai CauThuId!");
            }

            var newCauThu = new Cauthu
            {
                CauThuId = input.CauThuId,
                HoVaTen = input.HoVaTen,
                CauLacBoId = input.CauLacBoId,
                Ngaysinh = input.Ngaysinh,
                ViTri = input.ViTri,
                QuocTich = input.QuocTich,
                SoAo = input.SoAo,
                CanNang = input.CanNang,
                ChieuCao = input.ChieuCao,
                Anhdaidien = fileName,
            };

            db.Cauthus.Add(newCauThu);
            db.SaveChanges();
            return Ok(input);
        }
        private async Task<string> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }
            // Get the file name and extension
            string fileName = file.FileName;
            // Set the file path
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "Players", fileName);
            // Save the file to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return fileName;
        }
        [HttpPut]
        public IActionResult UpdateCauThu([FromBody] CauThuUpdateInputModel input)
        {
            var CauThu = (from a in db.Cauthus
                          join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
                          where a.CauThuId == input.CauThuId
                           select a).FirstOrDefault();
            if (CauThu == null)
            {
                return BadRequest("Khong tim thay Cau Thu");
            }

            CauThu.HoVaTen = input.HoVaTen;
            CauThu.CauLacBoId = input.CauLacBoId;
            CauThu.Ngaysinh = input.Ngaysinh;
            CauThu.ViTri = input.ViTri;
            CauThu.QuocTich = input.QuocTich;
            CauThu.SoAo = input.SoAo;
            CauThu.CanNang = input.CanNang;
            CauThu.ChieuCao = input.ChieuCao;
            CauThu.Anhdaidien = input.Anhdaidien;

            db.Cauthus.Update(CauThu);
            db.SaveChanges();

            return Ok(input);
        }
        [HttpDelete]
        public IActionResult DeleteCauThu(string input)
        {
            var cauthuCheck = (from a in db.Cauthus
                               join b in db.Caulacbos on a.CauLacBoId equals b.CauLacBoId
                               where a.CauThuId== input
                                select a).FirstOrDefault();

            if (cauthuCheck == null)
            {
                return BadRequest("Khong tim thay Cau Thu!");
            }

            db.Cauthus.Remove(cauthuCheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}
