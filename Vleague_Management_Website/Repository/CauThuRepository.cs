using Vleague_Management_Website.Models;
namespace Vleague_Management_Website.Repository
{
	public class CauThuRepository : ICauThuRepository
	{
		private readonly QlbongDaContext _context;
		public CauThuRepository(QlbongDaContext context)
		{
			_context = context;
		}

		public IEnumerable<Cauthu> GetAllTinTuc()
		{
			return _context.Cauthus;
		}

		public Cauthu GetCauthu(string macauthu)
		{
			return _context.Cauthus.Find(macauthu);
		}
	}
}
