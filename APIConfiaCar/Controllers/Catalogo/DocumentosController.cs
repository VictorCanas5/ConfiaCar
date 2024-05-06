using APIConfiaCar.PeticionesRest.Catalogos;
using APIConfiaCar.PeticionesRest.Usuarios;
using DBContext.DBConfiaCar;
using DBContext.DBConfiaCar.Catalogo;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using APIConfiaCar.Code;
using Newtonsoft.Json;
using DBContext.DBConfiaCar.Seguridad;
using System.Net;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using DBContext.DBConfiaCar.dbo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APIConfiaCar.Controllers.Catalogos
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentosController : ControllerBase
    {
        private DBConfiaCarContext DBContext;
        private IConfiguration Configuracion;

        public DocumentosController(IConfiguration _Configuration, DBConfiaCarContext _DBContext)
        {
            this.Configuracion = _Configuration;

            DBContext = _DBContext;
        }

        [HttpPost]
        [Route("GetDocumentos")]
        [Authorize]
        public async Task<IActionResult> GetDocumentos(APIConfiaCar.PeticionesRest.Documentos.Documentos parData)
        {
            try
            {
                var documentos = await DBContext.database.QueryAsync<Documentacion_VW>("WHERE Documento = 1 and VehiculoID = @0", parData.vehiculoID).ToArrayAsync();
                await DBContext.Destroy();
                return Ok(documentos); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetTipos")]
        [Authorize]
        public async Task<IActionResult> GetTipos()
        {
            try
            {
                var documentos = await DBContext.database.QueryAsync<TipoFoto>("WHERE Documento = 1").ToArrayAsync();
                await DBContext.Destroy();
                return Ok(documentos); 
            }

            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }

    

        [Consumes("multipart/form-data")]
        [HttpPost]
        [Route("subirEvidencia")]
        public async Task<IActionResult> subirEvidencia([FromForm] UploadFilesVehiculo parData)
        {
            try
            {

                //var UserName = HttpContext.User.Claims.Where(x => x.Type == "preferred_username").FirstOrDefault().Value; 
                var UsuarioActual = await DBContext.database.QueryAsync<DBContext.DBConfiaCar.Seguridad.Usuarios>("WHERE UsuarioID=@0", parData.UsuarioID).FirstOrDefaultAsync();
                var vehiculoExiste = await DBContext.database.QueryAsync<DBContext.DBConfiaCar.Catalogo.Documentacion>("WHERE VehiculoID=@0 AND TipoDocID=@1", parData.VehiculoID, parData.TipoDocID).ToArrayAsync();


                 var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{Configuracion["BucketApi:permissions:basic"]}:{Configuracion["BucketApi:permissions:secret"]}");
                 var basicToken = Convert.ToBase64String(plainTextBytes);
                 string path = $"{Configuracion["BucketApi:AwsPath_PruebasConfiaCar"]}/A{parData.VehiculoID}";
                 var ext = Path.GetExtension(parData.doc.FileName);
                 string file_name = $"{parData.VehiculoID}_{DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss")}{ext}";
                 byte[] file_byte = FilesManager.ConvertFiletoByteArray(parData.doc);

                 long DocumentoIDAux = 0;

                 HttpContent bytesContent = new ByteArrayContent(file_byte);
                 HttpContent stringContent = new StringContent(path);

                 using (var client = new HttpClient())
                 using (var formData = new MultipartFormDataContent())
                 {
                     client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basicToken);
                     formData.Add(stringContent, "path");
                     formData.Add(bytesContent, "file", $"{file_name}");
                     var response = await client.PostAsync($"{Configuracion["BucketApi:url"]}{Configuracion["BucketApi:uploadRequest"]}", formData);
                     if (response.IsSuccessStatusCode)
                     {
                        var Documento = new Documentacion();
                        Documento.NombreDocumento = parData.NombreDocumento;
                        Documento.VehiculoID = parData.VehiculoID;
                        Documento.RutaDocumento = $"{path}/{file_name}";
                        Documento.Observaciones = parData.Observaciones;
                        Documento.TipoDocID = parData.TipoDocID;

                        if (vehiculoExiste.Length > 0)
                        {
                            Documento.DocumentoID = vehiculoExiste[0].DocumentoID;
                            Documento.UsuarioCreacionID = vehiculoExiste[0].UsuarioCreacionID;
                            Documento.FechaCreacion = vehiculoExiste[0].FechaCreacion;
                            Documento.UsuarioModificacionID = UsuarioActual.UsuarioID;
                            Documento.FechaModificacion = DateTime.Now;
                            await DBContext.database.UpdateAsync(Documento);
                        }
                        else
                        {
                            Documento.UsuarioCreacionID = UsuarioActual.UsuarioID;
                            Documento.FechaCreacion = DateTime.Now;
                            await DBContext.database.InsertAsync(Documento);
                        }
                     }else{
                         await DBContext.Destroy();
                         return BadRequest(response.StatusCode);
                     }
                 }
                await DBContext.Destroy();
                return Ok();
            }
            catch (Exception ex)
            {
                await DBContext.Destroy();
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("getEvidencia")]
        public async Task<IActionResult> getEvidencia(APIConfiaCar.PeticionesRest.Documentos.getEvidencia parData)
        {
            var transaccion = false;
            try
            {
                var src = "";
                var srcBC = "";
                var Documento = await DBContext.database.QueryAsync<Documentacion>("WHERE VehiculoID=@0 AND DocumentoID=@1", parData.VehiculoID, parData.DocumentoID).SingleOrDefaultAsync();

                var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{Configuracion["BucketApi:permissions:basic"]}:{Configuracion["BucketApi:permissions:secret"]}");
                var basicToken = Convert.ToBase64String(plainTextBytes);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basicToken); ;
                    var response = await client.GetAsync($"{Configuracion["BucketApi:url"]}{Configuracion["BucketApi:getRequest"]}?expireIn=10&path={Documento.RutaDocumento}");
                    if (response.IsSuccessStatusCode)
                    {
                        var jsonString = await response.Content.ReadAsStringAsync();
                        var request = JsonConvert.DeserializeObject<BucketGet>(jsonString);
                        src = request.url;
                        srcBC = request.url;
                        WebClient MyWebClient = new WebClient();
                        MyWebClient.Credentials = new NetworkCredential(Configuracion["userFtpConfia"], Configuracion["passFtpConfia"]);
                        byte[] BytesFile = MyWebClient.DownloadData(srcBC);
                        string srcB64 = Convert.ToBase64String(BytesFile, 0, BytesFile.Length);
                        DBContext.database.BeginTransaction();
                        transaccion = true;
                        var res = new
                        {
                            res = 2,
                            msj = $"Consulta correcta del documento {parData.DocumentoID}",
                            src = $"{srcBC}"
                        };

                        DBContext.database.CompleteTransaction();
                        await DBContext.Destroy();
                        return Ok(res);
                    }
                    else
                    {
                        if (transaccion) ; DBContext.database.AbortTransaction();
                        await DBContext.Destroy();
                        return BadRequest(response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                if (transaccion) ; DBContext.database.AbortTransaction();
                await DBContext.Destroy();
                return BadRequest("ERROR AL GUARDAR LOS DATOS: " + ex.Message);
            }
        }
    }
}
