using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APITinTucController : Controller
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllTinTuc()
        {
            var listTinTuc = (from a in db.TinTucs
                              join b in db.TaiKhoans on a.TenDangNhap equals b.TenDangNhap
                               orderby a.NgayTao descending
                               select new
                               {
                                   a.TinTucId,
                                   a.NgayTao,
                                   a.TieuDe,
                                   a.NoiDung,
                                   b.TenDangNhap,
                                   a.Anhdaidien
                               })
                              .ToList();
            return Ok(listTinTuc);
        }

        [Route("getById")]
        [HttpGet]
        public IActionResult GetTinTucById(string id)
        {
            var listTinTuc = (from a in db.TinTucs
                              join b in db.TaiKhoans on a.TenDangNhap equals b.TenDangNhap
                              where a.TinTucId == id
                              orderby a.NgayTao descending
                              select new
                              {
                                  a.TinTucId,
                                  a.NgayTao,
                                  a.TieuDe,
                                  a.NoiDung,
                                  b.TenDangNhap,
                                  a.Anhdaidien
                              })
                              .FirstOrDefault();
            return Ok(listTinTuc);
        }
        [HttpPost]
        [Route("themtintuc")]
        public async Task<IActionResult> CreateTinTuc([FromForm] TinTucCreateInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Upload the image to the server
            string fileName = await UploadImage(model.Image);
            var username = HttpContext.Session.GetString("TenDangNhap");
            var userid = (from a in db.TaiKhoans
                          where a.TenDangNhap == username
                          select a.TenDangNhap.ToString()).FirstOrDefault();
            Console.WriteLine(userid);
            // Create a new TinTuc object with the form data
            var tinTuc = new TinTuc
            {
                TinTucId = model.TinTucId,
                NgayTao = model.NgayTao,
                TieuDe = model.TieuDe,
                NoiDung = model.NoiDung,
                Anhdaidien = fileName,
                TenDangNhap = userid
            };
            // Add the new TinTuc to the database
            db.TinTucs.Add(tinTuc);
            await db.SaveChangesAsync();
            return Ok();
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
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "News", fileName);
            // Save the file to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return fileName;
        }
        [HttpPut]
        [Route("capnhattintuc")]
        public async Task<IActionResult> UpdateTinTuc([FromForm] TinTucCreateInputModel model)
        {
            var username = HttpContext.Session.GetString("TenDangNhap");
            var userid = (from a in db.TaiKhoans
                          where a.TenDangNhap == username
                          select a.TenDangNhap.ToString()).FirstOrDefault();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the TinTuc in the database by id
            var tinTuc = await db.TinTucs.FindAsync(model.TinTucId);
            if (tinTuc == null)
            {
                return NotFound();
            }

            // Update the TinTuc object with the form data
            tinTuc.NgayTao = model.NgayTao;
            tinTuc.TieuDe = model.TieuDe;
            tinTuc.NoiDung = model.NoiDung;
            tinTuc.TenDangNhap = userid;

            // Upload the image to the server and update the TinTuc object with the new image name
            if (model.Image != null)
            {
                string fileName = await UploadImage(model.Image);
                tinTuc.Anhdaidien = fileName;
            }

            // Update the TinTuc in the database
            db.TinTucs.Update(tinTuc);
            await db.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteTinTuc(string input)
        {
            var tintucCheck = (from a in db.TinTucs
                                where a.TinTucId == input
                                select a).FirstOrDefault();

            if (tintucCheck == null)
            {
                return BadRequest("Khong tim thay tran dau");
            }

            db.TinTucs.Remove(tintucCheck);
            db.SaveChanges();

            return Ok(input);
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
