export namespace DBConfiaCar_Seguridad {
        
    export interface IPermisosRoles {
              
        PermisosRolID: number
      
        RolID?: number
      
        PermisoID?: number

    }
    export interface IRoles {
              
        RolID: number
      
        Nombre?: string

    }
    export interface IUsuarios {
              
        UsuarioID: number
      
        Nombre?: string
      
        PersonaID?: number
      
        RolID?: number
      
        Contraseña?: string
      
        NuevaContra?: boolean
      
        ContraseñaCifrada?: any
      
        MasterUser?: boolean
      
        FotoPerfil?: string
      
        Bloqueado?: boolean
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        FechaModificacion?: string
      
        ApellidoPaterno?: string
      
        ApellidoMaterno?: string
      
        Telefono?: string
      
        CorreoElectronico?: string
      
        AccesoAppConfiaCar?: boolean

    }
}