using Architecture.Data.Entities;
using Experts.Service.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertsController : ControllerBase
    {
        readonly IExpertService _expertService;
        const string emailTemplate = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
        
        public ExpertsController(IExpertService expertService)
        {
            _expertService = expertService;
        }

        [HttpGet("{email}")]
        public IActionResult GetExpertByEmail(string email)
        {
            try
            {
                var expert = _expertService.GetExpertByEmail(email);
                if (expert == null)
                {
                    return NotFound($"Expert with email {email} not found.");
                }
                return Ok(expert);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult CreateExpert([FromBody] Expert expert)
        {
            try
            {
                var createdExpert = _expertService.CreateExpert(expert);
                if (createdExpert == null)
                {
                    return BadRequest(new { message = "An expert with the same email already exists." });
                }
                return CreatedAtAction("GetExpertByEmail", new { email = createdExpert.Email }, createdExpert);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{email}")]
        public IActionResult UpdateExpert(string email, [FromBody] Expert expert)
        {
            try
            {
                var updatedExpert = _expertService.UpdateExpert(email, expert);
                return Ok(updatedExpert);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{email}")]
        public IActionResult DeleteExpert(string email)
        {
            try
            {
                _expertService.DeleteExpert(email);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
