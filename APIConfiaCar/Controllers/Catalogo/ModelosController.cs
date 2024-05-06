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
    public class ModelosController : Controller
    {

        private DBConfiaCarContext DBContext;
        public ModelosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetModelos")]
        [Authorize]
        public async Task<IActionResult> GetMarcas(APIConfiaCar.PeticionesRest.Modelos.Modelos parData)
        {
            try
            {
                var res = await DBContext.database.QueryAsync<Modelos>("WHERE MarcaID= @0", parData.MarcaID).ToArrayAsync();
                res.Distinct();
                await DBContext.Destroy();
                return Ok(res); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }






    }
}