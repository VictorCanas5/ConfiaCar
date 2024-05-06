using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.SqlClient;


namespace SignalR_AspNet.SignalR
{
  public class ServiceBrokerSQL
  {
    private string nombreMensaje = "";
    private string cadenaConexion = "";
    private string comandoEscucha = "";
    private SqlConnection conexion;

    public delegate void MensajeRecibido(object sender, string nombreMensaje);
    public event MensajeRecibido? OnMensajeRecibido = null;

    /// <summary>
    /// </summary>
    /// <param name="cadenaConexion"></param>
    /// <param name="comandoEscucha"></param>
    public ServiceBrokerSQL(string connectionString, string SQLquery, string nombreMensaje)
    {
      if (connectionString == "" || SQLquery == "") throw new ApplicationException("Debe indicar la cadena de conexión y el comando de escucha");
      this.cadenaConexion = connectionString;
      this.comandoEscucha = SQLquery;
      this.nombreMensaje = nombreMensaje;
      SqlDependency.Start(cadenaConexion);
      conexion = new SqlConnection(cadenaConexion);
    }

    /// <summary>
    /// </summary>
    ~ServiceBrokerSQL()
    {
      SqlDependency.Stop(cadenaConexion);
    }


    /// <summary>    /// </summary>
    /// <returns></returns>
    public void IniciarEscucha() 
    {
      try
      {
        SqlCommand cmd = new SqlCommand(comandoEscucha, conexion);
        cmd.CommandType = CommandType.Text;

        cmd.Notification = null;

        SqlDependency dependency = new SqlDependency(cmd);

        dependency.OnChange += new OnChangeEventHandler(OnChange);

        if (conexion.State == ConnectionState.Closed) conexion.Open();

        cmd.ExecuteReader(CommandBehavior.CloseConnection);
      }
      catch (Exception)
      {
        throw;
      }
    }


    /// <summary>
    /// </summary>
    public void DetenerEscucha()
    {
      SqlDependency.Stop(cadenaConexion);
    }


    /// <summary>
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
  private void OnChange(object sender, SqlNotificationEventArgs e)
  {
      try
      {
          SqlDependency dependency = (SqlDependency)sender;

          dependency.OnChange -= OnChange;

          if (e.Type == SqlNotificationType.Change)
          {
              switch (e.Info)
              {
                  case SqlNotificationInfo.Insert:
                  case SqlNotificationInfo.Update:
                      if (OnMensajeRecibido != null)
                      {
                          OnMensajeRecibido(this, nombreMensaje);
                      }
                      break;

                  // Puedes agregar más casos según sea necesario, dependiendo del tipo de cambio que estás monitoreando.

                  default:
                      // Otros tipos de cambio no son relevantes para tu lógica actual.
                      break;
              }
          }
      }
      catch (Exception ex)
      {
          // Manejar cualquier excepción y registrarla para el diagnóstico.
          Console.WriteLine($"Error en OnChange: {ex.Message}");
      }

  
  }

  }
}
