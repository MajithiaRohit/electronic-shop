using ElectronicShop.API.Common;
using System.Net;
using System.Text.Json;

namespace ElectronicShop.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, IWebHostEnvironment env)
        {
            _next = next;
            _env = env;
        }

        public async Task Invoke(HttpContext context) {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                await HandleException(context, HttpStatusCode.NotFound, ex.Message);
            }
            catch (Exception ex)
            {
                var message = _env.IsDevelopment()
                    ? ex.ToString()
                    : "Something went wrong. Please try again later.";
                await HandleException(context, HttpStatusCode.InternalServerError, message);
            }
        }

        private static async Task HandleException(HttpContext context,HttpStatusCode statusCode,string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var respone = new
            {
                statusCode = context.Response.StatusCode,
                message
            };
            await context.Response.WriteAsync(JsonSerializer.Serialize(respone));
        }
    }
}
