<?php

add_action('init', function() {
    register_post_type('event', [
        'public'              => true,
        'label'               => 'Events',
        'supports'            => ['title','editor','thumbnail','excerpt'],
        'menu_icon'           => 'dashicons-calendar',
        'has_archive'         => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'event',
        'graphql_plural_name' => 'events',
    ]);


    register_post_type('leadership', [
        'public'              => true,
        'label'               => 'Leadership',
        'supports'            => ['title','editor','thumbnail'],
        'menu_icon'           => 'dashicons-groups',
        'has_archive'         => false,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'leader',
        'graphql_plural_name' => 'leadership',
    ]);
});
