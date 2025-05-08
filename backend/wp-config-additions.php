


add_filter('xmlrpc_enabled', '__return_false');

define('FORCE_SSL_ADMIN', true);

define('DISALLOW_FILE_EDIT', true);

define('HEADLESS_MODE', true);

define('WP_ENVIRONMENT_TYPE', 'development');

if (defined('WP_CLI') && WP_CLI) {
    @ini_set('memory_limit', '512M');
}

add_action('graphql_response_headers', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
}, 10, 1);
