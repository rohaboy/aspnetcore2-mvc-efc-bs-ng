using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DutchTreat.Data;
using DutchTreat.Data.Entities;
using DutchTreat.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DutchTreat
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddIdentity<StoreUser, IdentityRole>(cfg =>
            {
                cfg.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DutchContext>(); //Here you can tell whether to store the identities in seperate DB or Same, here used Same context hence will be stored in same db

            services.AddAuthentication()
                    .AddCookie()
                    .AddJwtBearer(cfg=>
                    {
                        cfg.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidIssuer = _configuration["Tokens:Issuer"],
                            ValidAudience = _configuration["Tokens:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]))
                        };
                    });

            services.AddDbContext<DutchContext>(cfg=>
            {
                cfg.UseSqlServer(_configuration.GetConnectionString("DutchConnectionString"));
            });

            services.AddAutoMapper();

            services.AddTransient<DutchSeeder>();

            services.AddTransient<IMailService, NullMailService>();

            services.AddScoped<IDutchRepository, DutchRepository>();

            //add real mail service
            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }
            
            //app.UseDefaultFiles(); //This will stop serving all static default document files documen.html, index.htm, index.html etc.
            app.UseStaticFiles();
            app.UseNodeModules(env); //This must be only used in development

            app.UseAuthentication(); //this has to be before MVC else Authorize attribute will not know about where the authentication happening in pipeline

            app.UseMvc(cfg=>
            {
                cfg.MapRoute("Default",
                    "/{controller}/{action}/{id?}",
                    new { controller = "App", Action = "Index" });
            });
        }
    }
}
