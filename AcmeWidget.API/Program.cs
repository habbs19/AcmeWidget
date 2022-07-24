using AcmeWidget.ApplicationCore.AutoMapper;
using AcmeWidget.ApplicationCore.Interfaces;
using AcmeWidget.ApplicationCore.Models;
using AcmeWidget.Infrastructure.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IRepository<Activity>, ActivityRepository>();
builder.Services.AddTransient<IRepository<ActivityForm>, ActivityFormRepository>();
builder.Services.AddAutoMapper(options=> options.AddProfiles(new List<Profile> { new ActivityProfile(),new EmployeeProfile(),new ActivityFormProfile() }));

builder.Services.AddControllers();

builder.Services.AddDbContext<AcmeWidget.Infrastructure.EFCore.AcmeWidgetContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("AcmeWidget")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("acme-widget",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000",
                                "https://localhost:3000")
                                .AllowAnyMethod()
                                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AcmeWidget.Infrastructure.EFCore.AcmeWidgetContext>();
    context.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseCors("acme-widget");

app.MapControllers();

app.Run();
