using Architecture.Data;
using Experts.Service;
using Experts.Service.Contracts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//connect DB
builder.Configuration.AddJsonFile("appsettings.development.json", optional: true, reloadOnChange: true);

string cs = builder.Configuration.GetConnectionString("PostgresConnection");

builder.Services.AddDbContext<ArchitectureDbContext>(options =>
{
    options.UseNpgsql(cs);
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
}, ServiceLifetime.Singleton);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IExpertService, ExpertService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigin"); // Make sure this is before UseRouting and UseEndpoints

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
