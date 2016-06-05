using System.Web;
using System.Web.Optimization;

namespace Components
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            "~/Scripts/bootstrap.js",
            "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
            "~/Content/bootstrap.css",
            "~/Content/ui-bootstrap-csp.css",
            "~/Content/site.css",
            "~/Components/a11yTypeAhead/a11yTypeAhead.css",
            "~/Components/a11yCityTypeAhead/a11yCityTypeAhead.css"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
            "~/Scripts/moment.min.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
            "~/Scripts/angular.min.js",
            "~/Scripts/angular-route.js",
            "~/Scripts/angular-animate.js",
            "~/Scripts/angular-resource.js",
            "~/Scripts/angular-sanitize.min.js",
            "~/Scripts/angular-ui/ui-bootstrap.min.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
            "~/Scripts/app/app.js",
            "~/Scripts/app/app.config.js",
            "~/Components/a11yCommon/a11yCommon.js",
            "~/Components/a11yTypeAhead/a11yTypeAhead.js",
            "~/Components/a11yCityTypeAhead/a11yCityTypeAhead.js"
            ));
        }
    }
}
