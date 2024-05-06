namespace APIConfiaCar.PeticionesRest.Catalogos
{
    public class DocEvidencia
    {
        
    }
    public class UploadFilesVehiculo
    {
        public string? UsuarioID { get; set; }
        public int VehiculoID { set; get; }

        public int TipoDocID { get; set; }
        public string? NombreDocumento { set; get; }

        public string? Observaciones { set; get; }

        public IFormFile doc { get; set; }
    }
}
