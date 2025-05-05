<?php
// Register Events Custom Post Type
function delaware_dsa_register_event_post_type() {
    $args = array(
        'public' => true,
        'label'  => 'Events',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-calendar',
        'has_archive' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'event',
        'graphql_plural_name' => 'events',
    );
    register_post_type('event', $args);
}
add_action('init', 'delaware_dsa_register_event_post_type');

// Register Leadership Custom Post Type
function delaware_dsa_register_leadership_post_type() {
    $args = array(
        'public' => true,
        'label'  => 'Leadership',
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
        'has_archive' => false,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'leader',
        'graphql_plural_name' => 'leadership',
    );
    register_post_type('leadership', $args);
}
add_action('init', 'delaware_dsa_register_leadership_post_type');