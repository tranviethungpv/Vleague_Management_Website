using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APITinTucController : Controller
    {
        private readonly IWebHostEnvironment _environment;
        public APITinTucController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        QlbongDaContext db = new QlbongDaContext();
        [HttpGet]
        public IActionResult GetAllTinTuc()
        {
            var listTinTuc = (from a in db.TinTucs
                               orderby a.NgayTao descending
                               select new
                               {
                                   a.TinTucId,
                                   a.NgayTao,
                                   a.TieuDe,
                                   a.NoiDung,
                                   //a.NguoiDung,
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
                              where a.TinTucId == id
                              orderby a.NgayTao descending
                              select new
                              {
                                  a.TinTucId,
                                  a.NgayTao,
                                  a.TieuDe,
                                  a.NoiDung,
                                  //a.NguoiDung,
                                  a.Anhdaidien
                              })
                              .FirstOrDefault();
            return Ok(listTinTuc);
        }
        [HttpPost]
        public IActionResult AddTinTuc([FromForm] TinTucCreateInputModel tinTucDto)
        {
            if (tinTucDto == null || tinTucDto.ImageFile == null)
            {
                return BadRequest("Invalid request: image file is required.");
            }

            // Save image file to server
            var fileName = $"{Path.GetRandomFileName()}{Path.GetExtension(tinTucDto.ImageFile.FileName)}";
            var imagePath = Path.Combine(_environment.WebRootPath, "Images", fileName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                tinTucDto.ImageFile.CopyTo(stream);
            }

            var tinTuc = new TinTuc
            {
                TinTucId = tinTucDto.TinTucId,
                NgayTao = tinTucDto.NgayTao,
                TieuDe = tinTucDto.TieuDe,
                Anhdaidien = fileName,
            };

            // Save the TinTuc to your database
            using (var dbContext = new QlbongDaContext())
            {
                dbContext.TinTucs.Add(tinTuc);
            }

            return Ok();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
