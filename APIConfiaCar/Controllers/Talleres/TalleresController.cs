


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


namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalleresController : Controller
    {

        private DBConfiaCarContext DBContext;
        public TalleresController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetTalleres")]
        [Authorize]
        public async Task<IActionResult> GetTalleres()
        {
            try
            {
                var talleres = await DBContext.database.FetchAsync<Talleres>();
                await DBContext.Destroy();
                return Ok(talleres); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("InsertTalleres")]
        [Authorize]
        public async Task<IActionResult> InsertTalleres(APIConfiaCar.PeticionesRest.Talleres.TalleresInsert pardata)
        {
            try
            {
                var tallerNuevo = new DBContext.DBConfiaCar.Catalogo.Talleres()
                {
                    NombreTaller = pardata.nombre,
                    Direccion = pardata.direccion,
                    Telefono = pardata.telefono.ToString(),
                    Contacto = pardata.contacto,
                    FechaCreacion = DateTime.Now,
                };

                // Validar y asignar horario de apertura
                if (!string.IsNullOrEmpty(pardata.horarioApertura))
                {
                    if (DateTime.TryParse(pardata.horarioApertura, out DateTime horarioApertura))
                    {
                        tallerNuevo.HorarioApertura = horarioApertura;
                    }
                    else
                    {
                        return BadRequest("El formato del horario de apertura no es válido");
                    }
                }
                else
                {
                    return BadRequest("El horario de apertura no puede ser nulo o vacío");
                }

                // Validar y asignar horario de cierre
                if (!string.IsNullOrEmpty(pardata.horarioCierre))
                {
                    if (DateTime.TryParse(pardata.horarioCierre, out DateTime horarioCierre))
                    {
                        tallerNuevo.HorarioCierre = horarioCierre;
                    }
                    else
                    {
                        return BadRequest("El formato del horario de cierre no es válido");
                    }
                }
                else
                {
                    return BadRequest("El horario de cierre no puede ser nulo o vacío");
                }

                var insert = await DBContext.database.InsertAsync(tallerNuevo);
                
                if (insert != null)
                {
                    await DBContext.Destroy(); 
                    return Ok("El taller fue insertado con éxito");
                }
                else 
                {
                    await DBContext.Destroy(); 
                    return BadRequest("Ocurrió un error al agregar el nuevo taller");
                }
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }



    }
}

