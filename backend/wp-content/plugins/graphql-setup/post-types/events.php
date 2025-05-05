register_post_type( 'events', [
  'public'              => true,
  'show_in_graphql'     => true,
  'graphql_single_name' => 'Event',
  'graphql_plural_name' => 'Events',
  // …other args…
] );