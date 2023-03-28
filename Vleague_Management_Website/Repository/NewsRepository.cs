using Microsoft.EntityFrameworkCore;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Repository
{
    public class NewsRepository
    {
        QlbongDaContext db = new QlbongDaContext();
        public NewsRepository() { }
        public NewsRepository(QlbongDaContext context)
        {
            this.db = context;
        }
        public IEnumerable<TinTuc> GetAllTinTuc()
        {
            return db.TinTucs;
        }
        public TinTuc GetTinTuc(string newsid)
        {
            return db.TinTucs.Find(newsid);
        }
    }
}
