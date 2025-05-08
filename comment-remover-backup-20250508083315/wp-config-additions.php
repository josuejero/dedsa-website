// [VS Code] in delaware-dsa-website/backend/wp-config-additions.php

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');
// Force SSL admin
define('FORCE_SSL_ADMIN', true);
// Disable file editing
define('DISALLOW_FILE_EDIT', true);
// Headless mode
define('HEADLESS_MODE', true);
// Environment type
define('WP_ENVIRONMENT_TYPE', 'development');
// WP-CLI memory
if (defined('WP_CLI') && WP_CLI) {
    @ini_set('memory_limit', '512M');
}
// CORS for GraphQL
add_action('graphql_response_headers', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
}, 10, 1);
