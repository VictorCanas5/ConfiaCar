


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


namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {

        private DBConfiaCarContext DBContext;
        public UsersController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetUsers")]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var usuarios = await DBContext.database.FetchAsync<Usuarios>();
                await DBContext.Destroy();
                return Ok(usuarios); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("InsertUsers")]
        [Authorize]
        public async Task<IActionResult> InsertUsers(APIConfiaCar.PeticionesRest.Usuarios.Usuarios pardata)
        {
            try
            {
                var consultaExistente = await DBContext.database.QueryAsync<Usuarios>("WHERE CorreoElectronico = @0", pardata.Correo).FirstOrDefaultAsync();
                
                if(consultaExistente == null){

                      var usuarioNuevo = new DBContext.DBConfiaCar.Seguridad.Usuarios(){
                                            Nombre = pardata.nombre,
                                            ApellidoPaterno = pardata.apellidoPaterno,
                                            ApellidoMaterno = pardata.apellidoMaterno,
                                            MasterUser = pardata.Master,
                                            FechaCreacion = DateTime.Now,
                                            Contraseña = "123456",
                                            Telefono = pardata.celular.ToString(),
                                            CorreoElectronico = pardata.Correo,
                        };
                        var insert = await DBContext.database.InsertAsync(usuarioNuevo);
                        if(insert != null){await DBContext.Destroy(); return Ok("El usuario fue insertado con exito");}
                        else {await DBContext.Destroy(); return BadRequest("Ocurrio un error al agregar nuevo usuario");}
                }
                else{
                    await DBContext.Destroy();
                    return BadRequest("Ya existe un usuario con el correo indicado");
                }
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("UpdateUsuario")]
        [Authorize]
        public async Task<IActionResult> UpdateUsuarios(APIConfiaCar.PeticionesRest.Usuarios.Usuarios pardata)
        {
            try
            {
                var consultaUsuario = await DBContext.database.QueryAsync<Usuarios>("WHERE UsuarioID = @0", pardata.id).FirstOrDefaultAsync();
                    consultaUsuario.MasterUser = pardata.Master;
                    consultaUsuario.CorreoElectronico = pardata.Correo;
                    consultaUsuario.Telefono = pardata.celular.ToString();
                    consultaUsuario.Nombre = pardata.nombre;
                    consultaUsuario.ApellidoPaterno = pardata.apellidoPaterno;
                    consultaUsuario.ApellidoMaterno = pardata.apellidoMaterno;
                    consultaUsuario.FechaModificacion = DateTime.Now;

                var actualizacion = await DBContext.database.UpdateAsync(consultaUsuario);
                
                await DBContext.Destroy();
                return Ok(consultaUsuario);
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


    }
}

