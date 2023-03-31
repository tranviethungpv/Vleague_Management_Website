using Microsoft.AspNetCore.Mvc;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Repository
{
    public class KetQuaThiDauRepository
    {
        QlbongDaContext db = new QlbongDaContext();
        public KetQuaThiDauRepository() { }
        public KetQuaThiDauRepository(QlbongDaContext context)
        {
            this.db = context;
        }
        public IList<KetQuaThiDauObj> GetKetQuaThiDauObjs()
        {
            List<KetQuaThiDauObj> lstSend = new List<KetQuaThiDauObj>();

            var lstmatch = (from a in db.Trandaus
                            join b in db.Caulacbos on a.Clbnha equals b.CauLacBoId
                            join c in db.Caulacbos on a.Clbkhach equals c.CauLacBoId
                            where a.TrangThai == true
                            select new
                            {
                                Time = a.NgayThiDau,
                                Ketqua = a.KetQua,
                                CLbNha = b.TenClb,
                                CLBKhach = c.TenClb
                            }).OrderByDescending(x => x.Time).Take(10).ToList();
            foreach (var item in lstmatch)
            {
                string[] ketqua = item.Ketqua.Split("-");
                var banThangDoiNha = int.Parse(ketqua[0]);
                var banThangDoiKhach = int.Parse(ketqua[1]);
                lstSend.Add(new KetQuaThiDauObj
                {
                    Time = item.Time,
                    CLB_Nha = item.CLbNha,
                    BanThangDoiNha = banThangDoiNha,
                    BanThangDoiKhach = banThangDoiKhach,
                    CLB_Khach = item.CLBKhach,
                });
            }

            return lstSend;
        }
    }
    public class KetQuaThiDauObj // để hứng giá tri
    {
        public DateTime? Time;
        public string? CLB_Nha;
        public string? CLB_Khach;
        public int BanThangDoiNha;
        public int BanThangDoiKhach;
    }
}
