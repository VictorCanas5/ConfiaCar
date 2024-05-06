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
    [Route("api/Orden/[controller]")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {

        private DBConfiaCarContext DBContext;

        public VehiculosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        // [HttpGet]
        // [Route("getVehiculos")]
        // [Authorize]
        // public async Task<IActionResult> getVehiculos()
        // {
            
        //     try
        //     {
        //         var resultado = await DBContext.database.QueryAsync<VehiculosMarcas_VW>("WHERE Disponibilidad > 0").ToArrayAsync();

        //         await DBContext.Destroy();
        //         return Ok(resultado);
        //     }
        //     catch (Exception e)
        //     {
        //         await DBContext.Destroy();
        //         return Ok(e);
        //     }
            
        // }



        [HttpPost]
        [Route("AddVehiculo")]
        [Authorize]
        public async Task<IActionResult> guardarVehiculo(Vehiculos vehData)
        {
            try
            {
                // var UsuarioActual = await DBContext.database.QueryAsync<Usuarios>("WHERE Usuario=@0", vehData.UsuarioCreacionID).FirstOrDefaultAsync();

                await DBContext.database.InsertAsync<Vehiculos>(vehData);
                await DBContext.Destroy();
                return Ok(vehData);
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex);
            }
        }
    }
}
