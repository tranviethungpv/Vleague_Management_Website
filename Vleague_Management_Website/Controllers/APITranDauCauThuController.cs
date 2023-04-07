using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APITranDauCauThuController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();
        [HttpPost]
        
        public IActionResult AddTranDauCauThu([FromBody] TranDauCauThuCreateInputModel input)
        {
            var trandaucheck = db.Trandaus.Where(x => x.TranDauId == input.TranDauId).ToList();
            if(trandaucheck.Count == 0)
            {
                return BadRequest("Trận đấu không tồn tại");
            }

            var checkidcauthu = db.Cauthus.Where(x => x.CauThuId == input.CauThuId).FirstOrDefault();
            if (checkidcauthu == null)
            {
                return BadRequest("Cầu thủ này không tồn tại!");
            }

            var cauthucheck = db.TrandauCauthus.Where(x => x.CauThuId == input.CauThuId&& x.TranDauId == input.TranDauId).FirstOrDefault();
            if(cauthucheck != null)
            {
                return BadRequest("Cầu thủ đã tồn tại trong trận đấu này rồi!");
            }
            var record = new TrandauCauthu
            {
                CauThuId= input.CauThuId,
                TranDauId = input.TranDauId,
                ThoiGianBatDau = input.ThoiGianBatDau,
                ThoiGianKetThuc = input.ThoiGianKetThuc,
                PhamLoi = input.PhamLoi,
                TheDo = input.TheDo,
                TheVang = input.TheVang
            };
            db.TrandauCauthus.Add(record);
            db.SaveChanges();

            return Ok(input);
        }
        [HttpGet]
        [Route("getById")]
        public IActionResult GetRecordById(string trandauid,string cauthuid)
        {
            var record = db.TrandauCauthus.Where(x=>x.TranDauId==trandauid && x.CauThuId == cauthuid).FirstOrDefault();
            return Ok(record);
        }
        [HttpGet]
       
        public IActionResult GetAllTranDau([Range(1, 100)] int pageSize = 20,
            [Range(1, int.MaxValue)] int pageNumber = 1)
        {
            /*var lsttrandauactive = db.Trandaus.Where(x => x.TrangThai == false);*/
            var trandaucauthunotdone = (from a in db.TrandauCauthus
                                        join b in db.Trandaus on a.TranDauId equals b.TranDauId
                                        where b.TrangThai == false
                                        select a).ToList();
            return Ok(trandaucauthunotdone);
        }
        [HttpDelete]
        public IActionResult DeleteRecord(string trandauid, string cauthuid)
        {
            var trandau = db.Trandaus.FirstOrDefault(x => x.TranDauId == trandauid);
            var cauthu = db.Cauthus.FirstOrDefault(x => x.CauThuId == cauthuid);

            if (trandau == null || cauthu == null)
            {
                return BadRequest("Trận đấu hoặc cầu thủ không tồn tại.");
            }

            var recordtrandaucauthu = db.TrandauCauthus.FirstOrDefault(x => x.TranDauId == trandauid && x.CauThuId == cauthuid);

            if (recordtrandaucauthu == null)
            {
                return BadRequest("Không tìm thấy bản ghi để xóa.");
            }

            db.TrandauCauthus.Remove(recordtrandaucauthu);
            db.SaveChanges();

            return Ok();
        }



         [HttpPut]
        public IActionResult Update([FromBody] TranDauCauThuUpdateInputModel input)
        {
            var tranDauCauThu = (from a in db.TrandauCauthus 
                                 where a.CauThuId == input.CauThuId && a.TranDauId == input.TranDauId
                                 select a).FirstOrDefault();
            if(tranDauCauThu == null)
            {
                return BadRequest("Khong co ban ghi nhu nay");
            }
            tranDauCauThu.ThoiGianBatDau = input.ThoiGianBatDau;
            tranDauCauThu.ThoiGianKetThuc = input.ThoiGianKetThuc;
            tranDauCauThu.PhamLoi = input.PhamLoi;
            tranDauCauThu.TheVang = input.TheVang;
            tranDauCauThu.TheDo = input.TheDo;


            db.TrandauCauthus.Update(tranDauCauThu);
            db.SaveChanges();
            return Ok(tranDauCauThu);
            
        }
    }
}
