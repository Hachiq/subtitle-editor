using OpenAI;
using OpenAI.Audio;
using SubEditor.Constants;

namespace SubEditor.Services;

public class TranscriptionService(OpenAIClient client)
{
    private readonly AudioClient _client = client.GetAudioClient(AiModels.WhisperV1);

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
