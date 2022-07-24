using AcmeWidget.ApplicationCore.DTOs;
using AcmeWidget.ApplicationCore.Interfaces;
using AcmeWidget.ApplicationCore.Models;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AcmeWidget.API.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("acme-widget")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IRepository<ActivityForm> _repository;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public ActivityController(IRepository<ActivityForm> repository, ILogger<ActivityController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ActivityFormDTO), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Activity([FromBody] ActivityFormDTO model)
        {
            _logger.LogInformation($"++ New Sign Up ++");

            if (!ModelState.IsValid)
            {
                return BadRequest(model.ToString());
            }

            if (!Enum.IsDefined(model.Activity.Type))
            {
                return BadRequest($"{model.Activity.Type} is not a valid Activity");
            }

            var activity = _mapper.Map<ActivityForm>(model);

            var result = await _repository.CreateAsync(activity);
            return result.Match<IActionResult>(
                e => { return Ok(_mapper.Map<ActivityFormDTO>(e)); }, 
                error => { return BadRequest(error); });

        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(ActivityFormDTO), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Activity(int id)
        {
            _logger.LogInformation($"++ {ControllerContext.HttpContext.Request.Path} ++");

            var model = await _repository.GetAsync(id);

            return model.Match(
             e => { return Ok(_mapper.Map<ActivityFormDTO>(e)); },
             error => { return StatusCode((int)HttpStatusCode.NotFound,error); });
        }

        [HttpPut]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ActivityUpdate(ActivityFormDTO model)
        {
            _logger.LogInformation($"++ {ControllerContext.HttpContext.Request.Path} ++");

            if (!ModelState.IsValid)
            {
                return BadRequest(model.ToString());
            }
            if (!Enum.IsDefined(model.Activity.Type))
            {
                return BadRequest($"{model.Activity.Type} is not a valid Activity");
            }

            var activity = _mapper.Map<ActivityForm>(model);

            var result = await _repository.UpdateAsync(activity);
            return result.Match<IActionResult>(
             e => { return Ok(e); },
             error => { return BadRequest(error); });
        }

        [Route("list")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ActivityFormDTO>), (int)HttpStatusCode.OK)]
        public IActionResult Activity()
        {
            _logger.LogInformation($"++ {ControllerContext.HttpContext.Request.Path} ++");

            var result = _repository.GetAll();
            return result.Match(
             e => { return Ok(_mapper.Map<IEnumerable<ActivityFormDTO>>(e)); },
             error => { return StatusCode(500, error); });
        }

        [Route("type")]
        [HttpGet]
        [ProducesResponseType(typeof(IDictionary<int,string>), (int)HttpStatusCode.OK)]
        public IDictionary<int,string> GetActivityType()
        {
            _logger.LogInformation($"++ {ControllerContext.HttpContext.Request.Path} ++");
            
            var result = Enum.GetValues<Activity.ActivityType>().ToDictionary(e=> (int)e,e=> Enum.GetName(e));
            return result;
        }

    }
}
