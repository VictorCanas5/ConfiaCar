


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
using DBContext.DBConfiaCar.Seguridad;
using Microsoft.AspNetCore.Authorization;
using DBContext.DBConfiaCar.Creditos;


namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditosController : Controller
    {

        private DBConfiaCarContext DBContext;
        public CreditosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetCreditos")]
        [Authorize]
        public async Task<IActionResult> GetCreditos()
        {
            try
            {
                var usuarios = await DBContext.database.FetchAsync<Creditos>();
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

