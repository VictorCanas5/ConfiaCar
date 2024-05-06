using Microsoft.AspNetCore.Mvc;
using DBContext.DBConfiaCar;
using DBContext.DBConfiaCar.Catalogo;
using DBContext.DBConfiaCar.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBContext.DBConfiaCar.Catalogo;

namespace APIConfiaCar.Controllers.Orden
{
    [Route("api/[controller]")]
    [ApiController]
    public class SegurosController : ControllerBase
    {

        private DBConfiaCarContext DBContext;

        public SegurosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpGet]
        [Route("getSeguros")]
        [Authorize]
        public async Task<IActionResult> getSeguros()
        {
            
            try
            {
                var resultado = await DBContext.database.QueryAsync<Seguros_VW>("WHERE SeguroID > 0").ToArrayAsync();

                await DBContext.Destroy();
                return Ok(resultado);
            }
            catch (Exception e)
            {
                await DBContext.Destroy();
                return Ok(e);
            }
            
        }

    }
}