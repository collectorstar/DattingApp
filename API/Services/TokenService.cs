using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config){
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            //bat claims(yeu cau) duoc gui den
            var claims  = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName,user.UserName),
            };

            //thong tin nguoi dung
            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
            
            //mo ta token
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            //tao bo su ly token
            var tokenHandler = new JwtSecurityTokenHandler();

            //tao token = tokenhander(mo ta token ben tren)
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //tra ve token = bo xu ly token
            return tokenHandler.WriteToken(token);
        }
    }
}