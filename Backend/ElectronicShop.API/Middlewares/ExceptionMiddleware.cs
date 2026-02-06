using ElectronicShop.API.Common;
using System.Net;
using System.Text.Json;

namespace ElectronicShop.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
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
            catch (Exception)
            {
                await HandleException(context, HttpStatusCode.InternalServerError,
                    "Something went wrong. Please try again later.");
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
