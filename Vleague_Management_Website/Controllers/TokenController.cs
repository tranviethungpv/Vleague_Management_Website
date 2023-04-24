using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Vleague_Management_Website.Models;

namespace Vleague_Management_Website.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly QlbongDaContext _context;

        public TokenController(IConfiguration config, QlbongDaContext context)
        {
            _configuration = config;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(TaiKhoan _userData)
        {
            if (_userData != null && _userData.TenDangNhap != null && _userData.MatKhau != null)
            {
                var user = await GetUser(_userData.TenDangNhap, _userData.MatKhau);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("TenDangNhap", user.TenDangNhap.ToString()),
                        new Claim("MatKhau", user.MatKhau.ToString()),
                        new Claim("LoaiTaiKhoan", user.LoaiTaiKhoan.ToString()),
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<TaiKhoan> GetUser(string tendangnhap, string matkhau)
        {
            return await _context.TaiKhoans.FirstOrDefaultAsync(u => u.TenDangNhap == tendangnhap && u.MatKhau == matkhau);
        }
    }
}
