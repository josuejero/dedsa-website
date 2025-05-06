<?php
/**
 * Plugin Name: Delaware DSA GraphQL Extensions
 * Description: Custom fields & connections for WPGraphQL
 * Version:     1.0.0
 */

add_action('graphql_register_types', function() {
  // Category → Posts connection
  register_graphql_connection([
    'fromType'     => 'Category',
    'toType'       => 'Post',
    'fromFieldName'=> 'posts',
    'resolve'      => function($source, $args, $context, $info) {
      $resolver = new \WPGraphQL\Data\Connection\PostObjectConnectionResolver($source,$args,$context,$info);
      $resolver->set_query_arg('cat',$source->term_id);
      return $resolver->get_connection();
    }
  ]);

  // PublishPress Authors metadata
  register_graphql_object_type('AuthorMeta', [
    'description' => 'Extra PP Authors data',
    'fields'      => [
      'avatar' => ['type'=>'String','description'=>'Avatar URL'],
      'bio'    => ['type'=>'String','description'=>'Bio text'],
    ],
  ]);
  register_graphql_field('User','authorMeta',[
    'type'        => 'AuthorMeta',
    'resolve'     => function($user){
      if(function_exists('publishpress_authors_get_author_by_user_id')){
        $author = publishpress_authors_get_author_by_user_id($user->ID);
        if($author){
          return [
            'avatar'=> $author->get_avatar_url(),
            'bio'   => $author->get_description(),
          ];
        }
      }
      return null;
    }
  ]);
});
