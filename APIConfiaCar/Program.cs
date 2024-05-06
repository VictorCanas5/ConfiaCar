using Microsoft.EntityFrameworkCore;
using DBContext.DBConfiaCar;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
// using APIConfiaCar.Controllers.Notificaciones.NotificacionesWSocket;


var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddSingleton<RegenerateTokenService>();
builder.Services.AddSingleton<TokenGenerator>();
builder.Services.AddScoped<RenewTokenFilter>();
builder.Services.AddMemoryCache();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:key"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
                // Ejemplo de uso de RegenerateTokenService en cualquier momento
var serviceProvider = builder.Services.BuildServiceProvider();



builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
   {
       builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
   }));

//builder.Services.AddDbContext<ConfiaCarContext>(Opt => Opt.UseSqlServer(builder.Configuration.GetConnectionString("DBConfia")));
builder.Services.AddTransient(t =>
{
    var httpContextAccessor = t.GetService<IHttpContextAccessor>();
    var httpContext = httpContextAccessor.HttpContext;

    // Obt�n el ConnectionString de Configuration
    var connectionString = builder.Configuration.GetConnectionString("ConfiaCar_String");

    // Construye el objeto DBConfiaContext utilizando el ConnectionString y el HttpContext
    var dbContext = DBContext.DBConfiaCar.DBConfiaCarContext.BuildDatabase(connectionString, httpContext);
    return dbContext;
});

var app = builder.Build();
// app.MapHub<NotificacionesWSocket>("/notificacionesWS");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors("corsapp");

// var regenerateTokenService = serviceProvider.GetRequiredService<RegenerateTokenService>();
// regenerateTokenService.RenewToken();


app.Run();