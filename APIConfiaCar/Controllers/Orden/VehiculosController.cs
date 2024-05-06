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

        [HttpGet]
        [Route("getVehiculos")]
        [Authorize]
        public async Task<IActionResult> getVehiculos()
        {
            
            try
            {
                var resultado = await DBContext.database.FetchAsync<Vehiculo_VW>();

                await DBContext.Destroy();
                return Ok(resultado);
            }
            catch (Exception e)
            {
                await DBContext.Destroy();
                return Ok(e);
            }
            
        }



        [HttpPost]
        [Route("AddVehiculo")]
        [Authorize]
        public async Task<IActionResult> guardarVehiculo(APIConfiaCar.ModelsSP.InsertVehiculos parData)
        {
            try
            {
                var res = await DBContext.database.QueryAsync<APIConfiaCar.PeticionesRest.Catalogos.InsertVehiculoRes>("EXEC Catalogo.[PA_VehiculosProcess] @id ,@tipoV ,@marca ,@modelo ,@color ,@anio ,@precioCompra  ,@precioVenta  ,@sinprecioV  ,@numeroSerie ,@estatus ,@placas  ,@kilometraje  ,@transmision ,@noPuertas  ,@procedencia ,@observaciones", parData).FirstOrDefaultAsync();


               
                await DBContext.Destroy();
                return Ok(res);
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex);
            }
        }
    }
}
