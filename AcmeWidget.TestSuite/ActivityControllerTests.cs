using AcmeWidget.API.Controllers;
using AcmeWidget.ApplicationCore;
using AcmeWidget.ApplicationCore.DTOs;
using AcmeWidget.ApplicationCore.Interfaces;
using AcmeWidget.ApplicationCore.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace AcmeWidget.TestSuite
{
    public class ActivityControllerTests
    {
        private Mock<IRepository<ActivityForm>> repo = null!;
        private Mock<ILogger<ActivityController>> logger = null!;
        private Mock<IMapper> mapper = null!;

        [SetUp]
        public void Setup()
        {
            repo = new Mock<IRepository<ActivityForm>>();
            logger = new Mock<ILogger<ActivityController>>();
            mapper = new Mock<IMapper>();
        }

        [Test]
        public async Task CreateActivity()
        {
            var dto = new ActivityFormDTO
            {
                FormId = 1,
                Comments = "Test",
                Employee = new EmployeeDTO
                {
                    FirstName = "Bob",
                    LastName = "Doe",
                    EmailAddress = "bob@gmail.com"
                },
                Activity = new ActivityDTO
                {
                    Type = Activity.ActivityType.MountainClimbing
                }
            };

            var form = new ActivityForm
            {
                FID = 1,
                Comments = "Test",
                Employee = new Employee
                {
                    FirstName = "Bob",
                    LastName = "Doe",
                    EmailAddress = "bob@gmail.com"
                },
                Activity = new Activity
                {
                    Type = Activity.ActivityType.MountainClimbing
                }
            };
            var model = mapper.Setup(s => s.Map<ActivityForm>(dto)).Returns(form);

            var either = new Either<ActivityForm, string>(form);

            repo.Setup(s => s.CreateAsync(form)).ReturnsAsync(either);

            var controller = new ActivityController(repo.Object,logger.Object,mapper.Object);
         
            var result = await controller.Activity(dto);
            Assert.AreEqual(typeof(OkObjectResult),result.GetType());
        }
    }
}