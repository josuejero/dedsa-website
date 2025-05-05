// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Force SSL admin
define('FORCE_SSL_ADMIN', true);

// Disable file editing in the WordPress dashboard
define('DISALLOW_FILE_EDIT', true);

// Configure WordPress to understand it's being used headlessly
define('HEADLESS_MODE', true);

// Set WP_ENVIRONMENT_TYPE
define('WP_ENVIRONMENT_TYPE', 'development'); // Change to 'production' in production

// Increase memory limit for WP-CLI
if (defined('WP_CLI') && WP_CLI) {
    @ini_set('memory_limit', '512M');
}

// Add CORS headers for the WPGraphQL endpoint
add_action('graphql_response_headers', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    } else {
        header("Access-Control-Allow-Origin: *");
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
}, 10, 1);