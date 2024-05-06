


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

namespace APICobranza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentosController : Controller
    {

        private DBConfiaCarContext DBContext;
        public DocumentosController(DBConfiaCarContext _DBContext)
        {
            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetDocumentos")]
        [Authorize]
        public async Task<IActionResult> GetDocumentos()
        {
            try
            {
                var documentos = await DBContext.database.FetchAsync<Documentacion>();
                await DBContext.Destroy();
                return Ok(documentos); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }

        // [HttpPost]
        // [Route("GetPlacas")]
        // [Authorize]
        // public async Task<IActionResult> GetPlacas(APIConfiaCar.PeticionesRest.Documentos.Placas pardata)
        // {
        //     try
        //     {
        //         var todosLosDocumentos = await DBContext.database.FetchAsync<Placas>();
                
        //         var documentosFiltrados = todosLosDocumentos.Where(x => x.DocumentoID == pardata.documentoID).ToList();

        //         await DBContext.Destroy();
        //         return Ok(documentosFiltrados); 
        //     }
        //     catch (Exception ex)
        //     {
        //         await DBContext.Destroy();
        //         return BadRequest(ex.Message);
        //     }
        // }


        [HttpPost]
        [Route("InsertDocumentos")]
        [Authorize]
        public async Task<IActionResult> InsertDocumentos(APIConfiaCar.PeticionesRest.Documentos.DocumentosInsertUpdate pardata)
        {
            try
            {
                var documentoNuevo = new DBContext.DBConfiaCar.Catalogo.Documentacion()
                {
                    NombreDocumento = pardata.nombreDocumento,
                    FechaCreacion = DateTime.Now,
                    Observaciones = pardata.observaciones,
                    RutaDocumento = pardata.rutaDocumento,
                    UsuarioCreacionID = pardata.userID
                };

                if (pardata.vehiculoID != 0)
                {
                    documentoNuevo.VehiculoID = pardata.vehiculoID;
                }

                var insert = await DBContext.database.InsertAsync(documentoNuevo);

                if (insert != null)
                {
                    await DBContext.Destroy();
                    return Ok("El documento fue insertado con éxito");
                }
                else
                {
                    await DBContext.Destroy();
                    return BadRequest("Ocurrió un error al agregar el nuevo documento");
                }
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


        // [HttpPost]
        // [Route("InsertPlacas")]
        // [Authorize]
        // public async Task<IActionResult> InsertPlacas(APIConfiaCar.PeticionesRest.Documentos.PlacasInsert pardata)
        // {
        //     try
        //     {
        //         DateTime fechaVigencia;
        //         DateTime fechaRenovacion;

        //         if (DateTime.TryParse(pardata.fechaVigencia, out fechaVigencia) && DateTime.TryParse(pardata.fechaRenovacion, out fechaRenovacion))
        //         {
        //             fechaVigencia = fechaVigencia.ToUniversalTime();
        //             fechaRenovacion = fechaRenovacion.ToUniversalTime();

        //             var PlacasNuevas = new DBContext.DBConfiaCar.Catalogo.Placas()
        //             {
        //                 NumeroPlaca = pardata.numeroPlaca,
        //                 Dueño = pardata.dueño,
        //                 FechaVigencia = fechaVigencia,
        //                 FechaRenovacion = fechaRenovacion,
        //                 DocumentoID = pardata.documentoID
        //             };

        //             var insert = await DBContext.database.InsertAsync(PlacasNuevas);

        //             if (insert != null)
        //             {
        //                 await DBContext.Destroy();
        //                 return Ok("La placa fue insertada con éxito");
        //             }
        //             else
        //             {
        //                 await DBContext.Destroy();
        //                 return BadRequest("Ocurrió un error al insertar la placa");
        //             }
        //         }
        //         else
        //         {
        //             return BadRequest("Las cadenas de fecha no son válidas");
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         await DBContext.Destroy();
        //         return BadRequest(ex.Message);
        //     }
        // }




        [HttpPost]
        [Route("UpdateDocumento")]
        [Authorize]
        public async Task<IActionResult> UpdateDocumento(APIConfiaCar.PeticionesRest.Documentos.DocumentosInsertUpdate pardata)
        {
            try
            {
                var consultaDocumento = await DBContext.database.QueryAsync<Documentacion>("WHERE DocumentoID = @0", pardata.documentoID).FirstOrDefaultAsync();
                    consultaDocumento.NombreDocumento = pardata.nombreDocumento;
                    consultaDocumento.RutaDocumento = pardata.rutaDocumento;
                    consultaDocumento.Observaciones = pardata.observaciones;
                    consultaDocumento.UsuarioModificacionID = pardata.userID;
                    consultaDocumento.FechaModificacion = DateTime.Now;

                    if (pardata.vehiculoID != 0)
                    {
                        consultaDocumento.VehiculoID = pardata.vehiculoID;
                    }

                var actualizacion = await DBContext.database.UpdateAsync(consultaDocumento);
                
                await DBContext.Destroy();
                return Ok(consultaDocumento);
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


    }
}

