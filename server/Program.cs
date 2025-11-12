using OpenAI;
using SubEditor.Services;

namespace SubEditor;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddSingleton<OpenAIClient>(sp =>
        {
            var config = sp.GetRequiredService<IConfiguration>();
            var apiKey = config["OpenAI:ApiKey"];

            if (string.IsNullOrWhiteSpace(apiKey))
                throw new InvalidOperationException("Missing OpenAI API key in configuration.");

            return new OpenAIClient(apiKey);
        });

        builder.Services.AddSingleton<TranscriptionService>();

        builder.Services.AddCors(options =>
            options.AddPolicy(
                name: "NgOrigins",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                }
            )
        );

        builder.Services.AddControllers();

        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseCors("NgOrigins");

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}
