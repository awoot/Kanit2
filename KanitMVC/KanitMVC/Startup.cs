using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KanitMVC.Startup))]
namespace KanitMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
