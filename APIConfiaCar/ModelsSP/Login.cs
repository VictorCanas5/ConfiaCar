using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace APIConfiaCar.ModelsSP
{
    [ExplicitColumns]
    public class Login
    {
        [Column("USUARIO")]
        public string USUARIO { get; set; }

        [Column("PASSWORD")]
        public string PASSWORD { get; set; }

        [Column("ERROR")]
        public string ERROR { get; set; }

        [Column("VALIDO")]
        public bool VALIDO { get; set; }

        [Column("USUARIOID")]
        public int USUARIOID { get; set; }

        [Column("NOMBREUSUARIO")]
        public string NOMBREUSUARIO { get; set; }

        [Column("MASTERUSER")]
        public bool MASTERUSER { get; set; }

        [Column("ip")]
        public string ip { get; set; }
    }
}
