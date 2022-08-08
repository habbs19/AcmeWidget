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
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
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
            var dto = CreateActivityFormDTO();
            var form = CreateActivityForm();

            var model = mapper.Setup(s => s.Map<ActivityForm>(dto)).Returns(form);
            var either = new Either<ActivityForm, string>(form);
            repo.Setup(s => s.CreateAsync(form)).ReturnsAsync(either);

            var controller = new ActivityController(repo.Object,logger.Object,mapper.Object);
            controller.BindViewModel(dto);
            var result = await controller.Activity(dto);
            Assert.AreEqual(typeof(OkObjectResult),result.GetType());
        }

        [Test]
        public async Task CreateActivityInvalidModel()
        {
            var dto = CreateActivityFormDTO();
            dto.Employee = null!;

            var controller = new ActivityController(repo.Object, logger.Object, mapper.Object);

            controller.BindViewModel(dto);
            var result = await controller.Activity(dto);
            Assert.AreEqual(typeof(BadRequestObjectResult), result.GetType());
        }

        [Test]
        public async Task CreateActivityInvalidActivity()
        {
            var dto = CreateActivityFormDTO();
            dto.Activity = new ActivityDTO
            {
                Type = (Activity.ActivityType)9
            };

            var controller = new ActivityController(repo.Object, logger.Object, mapper.Object);

            var result = await controller.Activity(dto);
            Assert.AreEqual(typeof(BadRequestObjectResult), result.GetType());
            Assert.AreEqual(((BadRequestObjectResult)result).Value, "9 is not a valid Activity");
        }

        [Test]
        public async Task DeleteActivityForm()
        {
            var dto = CreateActivityFormDTO();

            var controller = new ActivityController(repo.Object, logger.Object, mapper.Object);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
            };
            controller.ControllerContext.HttpContext.Request.Path = "/activity";

            int modelId = 1;
            int totalDeletedRecords = 3;
            var either = new Either<int, string>(totalDeletedRecords);
            repo.Setup(s => s.DeleteAsync(modelId)).ReturnsAsync(either);

            var result = await controller.DeleteParticipant(1);
            Assert.AreEqual(typeof(OkObjectResult), result.GetType());
            Assert.AreEqual(3, ((OkObjectResult)result).Value);
        }

        [Test]
        public async Task GetActivityTypeList()
        {
            Activity.ActivityType[] e = Enum.GetValues<Activity.ActivityType>();
            var expectedList = new List<Activity.ActivityTypeModel>();
            foreach (Activity.ActivityType type in e)
            {
                expectedList.Add(new Activity.ActivityTypeModel
                {
                    Type = (int)type,
                    Name = Enum.GetName(type)
                });
            }
            var model = mapper.Setup(s => s.Map<IEnumerable<Activity.ActivityTypeModel>>(e)).Returns(expectedList);

            var controller = new ActivityController(repo.Object, logger.Object, mapper.Object);
            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
            };
            controller.ControllerContext.HttpContext.Request.Path = "/activity/typelist";

            var result = await controller.GetActivityTypeList();
            Assert.AreEqual(expectedList, ((OkObjectResult)result).Value);
        }

        
        private static ActivityFormDTO CreateActivityFormDTO()
        {
            return new ActivityFormDTO
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
        }
        
        private static ActivityForm CreateActivityForm()
        {
            return new ActivityForm
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
        }
    }
}