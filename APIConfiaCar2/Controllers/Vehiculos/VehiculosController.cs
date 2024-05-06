


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
using DBContext.DBConfiaCar.Catalogo;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using DBContext.DBConfiaCar.General;

namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculosController : Controller
    {

        private DBConfiaCarContext DBContext;
        public VehiculosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetVehiculos")]
        [Authorize]
        public async Task<IActionResult> GetVehiculos()
        {
            try
            {
                var vehiculos = await DBContext.database.FetchAsync<Vehiculos>();
                await DBContext.Destroy();
                return Ok(vehiculos); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }



    }
}

