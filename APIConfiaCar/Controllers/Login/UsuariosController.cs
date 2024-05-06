using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using NPoco;

using System.IO;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;

using System.Net;
using System.Collections;

using DBContext.DBConfiaCar;
using DBContext.DBConfiaCar.Seguridad;
using APIConfiaCar.PeticionesRest.Login;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;

namespace APIConfiaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private DBConfiaCarContext DBContext;
        private readonly RegenerateTokenService _regenerateTokenService;
        // private DBConfiaContext ConexionBD;

        public UsuariosController(DBConfiaCarContext _DBContext, RegenerateTokenService regenerateTokenService)
        {
            DBContext = _DBContext;
              _regenerateTokenService = regenerateTokenService;
        }


 
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUsuario(APIConfiaCar.PeticionesRest.Login.Login pardata)
        {
            try
            
            {
                 IPHostEntry ipEntry = Dns.GetHostEntry(Dns.GetHostName());
                 IPAddress[] addr = ipEntry.AddressList;
                 
                var obj = new
                {
                    USUARIO = pardata.Usuario,
                    PASSWORD = pardata.Password,
                    VALIDO = "",
                    ERROR = "",
                    USUARIOID = 0,
                    NOMBREUSUARIO = "",
                    MASTERUSER = 1,
                };

                var consulta = await DBContext.database.QueryAsync<APIConfiaCar.ModelsSP.Login>("EXEC dbo.UtilValidaAcceso @USUARIO, @PASSWORD, @VALIDO, @ERROR, @USUARIOID, @NOMBREUSUARIO, @MASTERUSER", obj).FirstOrDefaultAsync();
                if(consulta.USUARIOID != 0){

                            var roles = await DBContext.database.QueryAsync<Usuarios>("WHERE CorreoElectronico LIKE @0", "%" + pardata.Usuario + "%").FirstOrDefaultAsync();  
                            if(roles != null){
                                var tokenGenerado =  GenerarToken(pardata);
                                var result = new
                                {
                                    TokenGenerado = tokenGenerado,
                                    consulta = consulta,
                                    rol = roles.RolID == 1 ? 
                                                "Comprador" : "Vendedor",
                                    estatus = roles.Bloqueado,
                                    master = roles.MasterUser,
                                    cambioContra = roles.NuevaContra
                                };
                                await DBContext.Destroy();
                                return Ok(result);
                            }
                            else
                            {
                                await DBContext.Destroy();
                                return BadRequest("Error al validar permisos");
                            }

                }
               else{
                    await DBContext.Destroy();
                    return BadRequest("Error al confirmar usuario");
               }
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("regenerarToken")]
        public IActionResult RegenerarToken()
        {
            try
            {
                var newToken = _regenerateTokenService.RenewToken();
                return Ok(newToken);
            }
            catch
            {
                return BadRequest("Error al regenerar el token");
            }
        }


        private  string GenerarToken(APIConfiaCar.PeticionesRest.Login.Login pardata)
        {
            IConfiguration Configuration;

            Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            var sqlServerConfig = Configuration.GetSection("JWT");
            string conn = sqlServerConfig["key"];

            var claims = new[]
            {
                new Claim(ClaimTypes.Name,pardata.Usuario),
                //new Claim(ClaimTypes.Email,pardata.Password)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(conn));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var securityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials:creds
              );
            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return token;
        }

    }
}





public class RegenerateTokenService
{
    private readonly IConfiguration _configuration;
    private readonly IServiceProvider _serviceProvider;
    private readonly IMemoryCache _memoryCache;


    public RegenerateTokenService(IConfiguration configuration, IServiceProvider serviceProvider, IMemoryCache memoryCache)
    {
        _configuration = configuration;
        _serviceProvider = serviceProvider;
        _memoryCache = memoryCache;
    }

    public string RenewToken()
    {
        var usuarioEnCache = "Byron Aldebaran";
        var tokenGenerator = _serviceProvider.GetRequiredService<TokenGenerator>();
        var pardata = new APIConfiaCar.PeticionesRest.Login.Login
        {
            Usuario = usuarioEnCache
        };

        var newToken = tokenGenerator.GenerarToken(pardata);
        return newToken;
    }


}


public class TokenGenerator
{
    private readonly IConfiguration _configuration;

    public TokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerarToken(APIConfiaCar.PeticionesRest.Login.Login pardata)
    {
        var sqlServerConfig = _configuration.GetSection("JWT");
        string conn = sqlServerConfig["key"];

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, pardata.Usuario),
            //new Claim(ClaimTypes.Email,pardata.Password)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(conn));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: creds
        );
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return token;
    }

}

public class RenewTokenFilter : IAsyncActionFilter
{
    private readonly RegenerateTokenService _regenerateTokenService;

    public RenewTokenFilter(RegenerateTokenService regenerateTokenService)
    {
        _regenerateTokenService = regenerateTokenService;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        // Renueva el token antes de ejecutar la acción
        _regenerateTokenService.RenewToken();

        // Continúa con la ejecución de la acción
        var resultContext = await next();

        // Si deseas realizar alguna lógica después de ejecutar la acción, puedes hacerlo aquí

    }
}