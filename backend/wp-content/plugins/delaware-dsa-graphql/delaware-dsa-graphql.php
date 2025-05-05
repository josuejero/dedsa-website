<?php
/**
 * Plugin Name: Delaware DSA GraphQL Extensions
 * Description: Extends WPGraphQL schema with custom fields and connections
 * Version: 1.0.0
 * Author: Delaware DSA Development Team
 */

// Register category term to post connection
add_action('graphql_register_types', function() {
    register_graphql_connection([
        'fromType' => 'Category',
        'toType' => 'Post',
        'fromFieldName' => 'posts',
        'resolve' => function($source, $args, $context, $info) {
            $resolver = new \WPGraphQL\Data\Connection\PostObjectConnectionResolver($source, $args, $context, $info);
            $resolver->set_query_arg('cat', $source->term_id);
            return $resolver->get_connection();
        }
    ]);
});

// Register custom fields for PublishPress Authors
add_action('graphql_register_types', function() {
    register_graphql_object_type('AuthorMeta', [
        'description' => 'Additional author metadata',
        'fields' => [
            'avatar' => [
                'type' => 'String',
                'description' => 'Author avatar URL',
            ],
            'bio' => [
                'type' => 'String',
                'description' => 'Author biography',
            ],
        ],
    ]);
    
    register_graphql_field('User', 'authorMeta', [
        'type' => 'AuthorMeta',
        'description' => 'Author metadata from PublishPress Authors',
        'resolve' => function($user) {
            // Get PublishPress Authors data
            if (function_exists('publishpress_authors_get_author_by_user_id')) {
                $author = publishpress_authors_get_author_by_user_id($user->ID);
                if ($author) {
                    return [
                        'avatar' => $author->get_avatar_url(),
                        'bio' => $author->get_description(),
                    ];
                }
            }
            return null;
        }
    ]);
});