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

using DBContext.DBConfiaCar;
using DBContext.DBConfiaCar.General;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using DBContext.DBConfiaCar.Catalogo;

namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : Controller
    {

        private DBConfiaCarContext DBContext;
        public MarcasController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpGet]
        [Route("GetMarcas")]
        [Authorize]
        public async Task<IActionResult> GetMarcas()
        {
            try
            {
                var usuarios = await DBContext.database.FetchAsync<Marcas>();
                await DBContext.Destroy();
                return Ok(usuarios); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }






    }
}

