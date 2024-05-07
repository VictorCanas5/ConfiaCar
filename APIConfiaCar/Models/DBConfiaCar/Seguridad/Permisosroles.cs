using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Seguridad
{
    [TableName("Seguridad.PermisosRoles")]
    [ExplicitColumns]
    [PrimaryKey("PermisosRolID")]
    public class PermisosRoles
    {
              
        
        [Column("PermisosRolID")]
        public int PermisosRolID { get; set; }
      
        
        [Column("RolID")]
        public int? RolID { get; set; }
      
        
        [Column("PermisoID")]
        public int? PermisoID { get; set; }


        // ###############################################
        // Parent foreing keys
        // >>
        // ###############################################
        
        // ###############################################
        // <<
        // Parent foreing keys
        // ###############################################

        // ###############################################
        // Child foreing keys
        // >>
        // ###############################################
        
        // ###############################################
        // <<
        // Child foreing keys
        // ###############################################
        
    }
}
