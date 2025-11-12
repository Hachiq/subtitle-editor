using OpenAI;
using OpenAI.Audio;

namespace SubEditor.Services;

public class TranscriptionService
{
    private readonly AudioClient _client;

    public TranscriptionService(IConfiguration config)
    {
        // TODO: Handle missing API key scenario.
        // TODO: Consider using dependency injection for the AudioClient.
        var apiKey = config["OpenAI:ApiKey"];
        _client = new AudioClient("whisper-1", apiKey);
    }

    public async Task<string> TranscribeToSrtAsync(IFormFile file)
    {
        if (file is null || file.Length == 0)
        {
            throw new ArgumentNullException("No audio file provided.");
        }
        using var stream = file.OpenReadStream();
        AudioTranscription transcription = await _client.TranscribeAudioAsync(stream, file.FileName);
        return transcription.Text;
    }
}
