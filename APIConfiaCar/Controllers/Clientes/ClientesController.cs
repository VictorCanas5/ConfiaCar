


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

namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : Controller
    {

        private DBConfiaCarContext DBContext;
        public ClientesController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetClientes")]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var usuarios = await DBContext.database.FetchAsync<Clientes_VW>();
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
        [Route("InsertCliente")]
        [Authorize]
        public async Task<IActionResult> InsertUsers(APIConfiaCar.PeticionesRest.Clientes.ClientesInsert pardata)
        {
            try
            {
                var consultaExistente = await DBContext.database.QueryAsync<Personas>("WHERE CorreoElectronico = @0", pardata.Correo).FirstOrDefaultAsync();
                
                if (consultaExistente == null)
                {
                    DateTime fechaNacimiento;
                    if (DateTime.TryParse(pardata.fechaNacimiento, out fechaNacimiento))
                    {
                        var ClienteNuevo = new DBContext.DBConfiaCar.General.Personas()
                        {
                            Nombre = pardata.nombre,
                            ApellidoPaterno = pardata.apellidoPaterno,
                            ApellidoMaterno = pardata.apellidoMaterno,
                            CreacionFecha = DateTime.Now,
                            FechaNacimiento = fechaNacimiento, // Asignar la fecha de nacimiento convertida
                            LugarNacimiento = pardata.lugarNacimiento,
                            CURP = pardata.curp,
                            RFC = pardata.rfc,
                            SexoID = pardata.sexoID,
                            EstadoCivilID = pardata.estadoCivilID,
                            EscolaridadID = pardata.escolaridadID,
                            IngresosMensuales = pardata.ingresosMensuales,
                            TelefonoDomicilio = pardata.telefonoDomicilio,
                            CorreoElectronico = pardata.Correo,
                            TelefonoMovil = pardata.telefonoMovil,
                            identificacionNumero = pardata.identificacionNumero,
                            Observaciones = pardata.observaciones,
                            BuroInternoEstatusID = pardata.buroInternoEstatusID,
                            BloqueadoCliente = pardata.bloqueadoCliente,
                            NombreConyuge = "N/A"                
                        };
                        
                        var insert = await DBContext.database.InsertAsync(ClienteNuevo);

                        var personaID = ClienteNuevo.PersonaID;

                        if (insert != null)
                        {
                            var clienteNuevo = new Clientes()
                            {
                                PersonaID = personaID, 
                            };

                            var insertCliente = await DBContext.database.InsertAsync(clienteNuevo);

                            if (insertCliente != null)
                            {
                                await DBContext.Destroy();
                                return Ok("El usuario fue insertado con éxito");
                            }
                            else
                            {
                                await DBContext.Destroy();
                                return BadRequest("Ocurrió un error al agregar nuevo usuario en la tabla Clientes");
                            }
                        }
                        else
                        {
                            await DBContext.Destroy();
                            return BadRequest("Ocurrió un error al agregar nuevo usuario en la tabla Personas");
                        }
                    }
                    else
                    {
                        await DBContext.Destroy();
                        return BadRequest("El formato de la fecha de nacimiento es incorrecto");
                    }
                }
                else
                {
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
        [Route("UpdateCliente")]
        [Authorize]
        public async Task<IActionResult> UpdateUsuarios(APIConfiaCar.PeticionesRest.Clientes.ClientesUpdate pardata)
        {
            try
            {
                var cliente = await DBContext.database.QueryAsync<Clientes>("WHERE ClienteID = @0", pardata.idCliente).FirstOrDefaultAsync();
                
                if (cliente == null)
                {
                    return NotFound("Cliente no encontrado");
                }

                long? clienteID = cliente?.PersonaID;
                int personaID = clienteID.HasValue ? (int)clienteID.Value : 0;


                var persona = await DBContext.database.QueryAsync<Personas>("WHERE PersonaID = @0", personaID).FirstOrDefaultAsync();
                
                if (persona == null)
                {
                    return NotFound("Persona no encontrada");
                }

                persona.Nombre = pardata.nombre;
                persona.ApellidoPaterno = pardata.apellidoPaterno;
                persona.ApellidoMaterno = pardata.apellidoMaterno;
                persona.ModificacionFecha = DateTime.Now;
                
                if (!string.IsNullOrEmpty(pardata.fechaNacimiento))
                {
                    DateTime fechaNacimiento;
                    if (DateTime.TryParseExact(pardata.fechaNacimiento, "d/M/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaNacimiento))
                    {
                        persona.FechaNacimiento = fechaNacimiento;
                    }
                    else
                    {
                        return BadRequest("La fecha de nacimiento recibida tiene un formato incorrecto");
                    }
                }
                
                persona.LugarNacimiento = pardata.lugarNacimiento;
                persona.CURP = pardata.curp;
                persona.RFC = pardata.rfc;
                persona.SexoID = pardata.sexoID;
                persona.EstadoCivilID = pardata.estadoCivilID;
                persona.EscolaridadID = pardata.escolaridadID;
                persona.IngresosMensuales = pardata.ingresosMensuales;
                persona.TelefonoDomicilio = pardata.telefonoDomicilio;
                persona.CorreoElectronico = pardata.Correo;
                persona.TelefonoMovil = pardata.telefonoMovil;
                persona.identificacionNumero = pardata.identificacionNumero;
                persona.Observaciones = pardata.observaciones;
                persona.BuroInternoEstatusID = pardata.buroInternoEstatusID;
                persona.BloqueadoCliente = pardata.bloqueadoCliente;

                var actualizacionPersona = await DBContext.database.UpdateAsync(persona);

                var actualizacionCliente = await DBContext.database.UpdateAsync(cliente);
                
                await DBContext.Destroy();
                return Ok(persona);
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }





    }
}

