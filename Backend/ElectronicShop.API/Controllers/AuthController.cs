using ElectronicShop.API.Data;
using ElectronicShop.API.DTOs.Login;
using ElectronicShop.API.Helpers;
using ElectronicShop.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ElectronicShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request body");

            var user = _context.Users.FirstOrDefault(x =>
                x.Email == request.Email && x.IsActive);

            if (user == null)
                return Unauthorized("Invalid credentials");

            if (!PasswordHasher.Verify(request.Password, user.Password))
                return Unauthorized("Invalid credentials");

            var token = GenerateToken(user);

            return Ok(new
            {
                token,
                user.Name,
                user.Role
            });
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.Email, user.Email)
        };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
