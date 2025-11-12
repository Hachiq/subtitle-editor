using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SubEditor.Services;

namespace SubEditor.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MediaController(TranscriptionService _transcriptionService) : ControllerBase
{
    [HttpPost("transcribe")]
    public async Task<IActionResult> TranscribeAudio(IFormFile file)
    {
        try
        {
            var result = await _transcriptionService.TranscribeToSrtAsync(file);
            return Ok(new { Text = result});
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
