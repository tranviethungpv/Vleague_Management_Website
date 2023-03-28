using Vleague_Management_Website.Models;
namespace Vleague_Management_Website.Repository
{
	public interface ICauThuRepository
	{
		Cauthu GetCauthu(String macauthu);
		IEnumerable<Cauthu> GetAllTinTuc();
	}
}
