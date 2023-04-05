using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.InputModelsAPI;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APITranDauGhiBanController : ControllerBase
    {
        QlbongDaContext db = new QlbongDaContext();

        [Route("getCauThuTranDau")]
        [HttpGet]
        public IActionResult GetCauThuTranDau(string id)
        {
            var CauThuTranDau = (from a in db.TrandauCauthus
                           join b in db.Cauthus on a.CauThuId equals b.CauThuId
                           where a.TranDauId == id
                           select b)
                              .ToList();
            return Ok(CauThuTranDau);
        }

        [Route("getById")]
        [HttpGet]
        public IActionResult GetTranDauById(string trandauid, string cauthuid)
        {
            var CauThuTranDau = (from a in db.TrandauCauthus
                                 join b in db.Cauthus on a.CauThuId equals b.CauThuId
                           where a.TranDauId == trandauid && a.CauThuId == cauthuid
                           select new
                           {
                               a.TranDauId,
                               a.CauThuId,
                               b.CauLacBoId
                           })
                              .FirstOrDefault();
            return Ok(CauThuTranDau);
        }

        [HttpPost]
        public IActionResult AddTranDauGhiBan([FromBody] TranDauGhiBanCreateInputModel input)
        {
            var tranDauCheck = db.Trandaus.Where(x => x.TranDauId == input.TranDauId).ToList();
            var lstCauThu = db.Cauthus.Where(x => x.CauThuId == input.CauThuId).ToList();
            var lstBanthang = db.TrandauGhibans.Where(x => x.GhiBanId == input.GhiBanId).ToList();
            if (tranDauCheck.Count == 0)
            {
                return BadRequest("Không tồn tại trận đấu");
            }
            if (lstCauThu.Count == 0)
            {
                return BadRequest("Không tồn tại cầu thủ");
            }
            if (lstBanthang.Count > 0)
            {
                return BadRequest("Đã tồn tại bàn thắng");
            }

            var newTranDauGhiBan = new TrandauGhiban
            {
                TranDauId = input.TranDauId,
                GhiBanId = input.GhiBanId,
                CauLacBoId = input.CauLacBoId,
                ThoiDiemGhiBan = input.ThoiDiemGhiBan,
                CauThuId = input.CauThuId
            };

            db.TrandauGhibans.Add(newTranDauGhiBan);
            db.SaveChanges();

            return Ok(input);
        }

        public IActionResult UpdateTranDauGhiBan([FromBody] TranDauGhiBanUpdateInputModel input)
        {
            var tranDauGhiBan = db.TrandauGhibans.Where(x => x.GhiBanId == input.GhiBanId).FirstOrDefault();
            var tranDauCheck = db.Trandaus.Where(x => x.TranDauId == input.TranDauId).ToList();
            var lstCauThu = db.Cauthus.Where(x => x.CauThuId == input.CauThuId).ToList();
            var lstBanthang = db.TrandauGhibans.Where(x => x.GhiBanId == input.GhiBanId).ToList();

            if(tranDauGhiBan == null)
            {
                return BadRequest("Không tồn tại bàn thắng");
            }
            if (tranDauCheck.Count == 0)
            {
                return BadRequest("Không tồn tại trận đấu");
            }
            if (lstCauThu.Count == 0)
            {
                return BadRequest("Không tồn tại cầu thủ");
            }
            if (lstBanthang.Count > 0)
            {
                return BadRequest("Đã tồn tại bàn thắng");
            }

            tranDauGhiBan.ThoiDiemGhiBan = input.ThoiDiemGhiBan;
            tranDauGhiBan.CauThuId = input.CauThuId;

            db.TrandauGhibans.Update(tranDauGhiBan);
            db.SaveChanges();

            return Ok(input);
        }

        [HttpDelete]
        public IActionResult DeleteTranDauGhiBan(string input)
        {
            var tranDauGhiBanCheck = (from a in db.TrandauGhibans
                                where a.GhiBanId == input
                                select a).FirstOrDefault();

            if (tranDauGhiBanCheck == null)
            {
                return BadRequest("Không tìm thấy bàn thắng");
            }

            db.TrandauGhibans.Remove(tranDauGhiBanCheck);
            db.SaveChanges();

            return Ok(input);
        }
    }
}
