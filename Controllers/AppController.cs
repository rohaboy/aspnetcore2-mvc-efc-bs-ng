using DutchTreat.Services;
using DutchTreat.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DutchTreat.Controllers
{
    public class AppController : Controller
    {
        private readonly IMailService _mailService;

        public AppController(IMailService mailService)
        {
            _mailService = mailService;
        }
        public IActionResult Index()
        {
            //throw new Exception("Bad things happened");
            return View();
        }

        [HttpGet("contact")] //contact is still discoverable by Tag Helper, but not by href url
        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost("contact")] //contact is still discoverable by Tag Helper, but not by href url
        public IActionResult Contact(ContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                //Send the email
                _mailService.SendMessage("admin@DutchTreat.com",model.Subject,$"From:{model.Name} - {model.Email},Message:{model.Message}");
                ViewBag.UserMessage = "Mail Sent";
                ModelState.Clear();
            }
           
            return View();
        }

        public IActionResult AboutUs()
        {
            ViewBag.Title = "About Us";

            return View();
        }
    }
}
