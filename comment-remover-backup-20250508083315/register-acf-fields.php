<?php
if( function_exists('acf_add_local_field_group') ) {
  acf_add_local_field_group([
    'key'               => 'group_event_fields',
    'title'             => 'Event Details',
    'show_in_graphql'   => 1,
    'graphql_field_name'=> 'eventFields',
    'fields'            => [
      [
        'key'             => 'field_event_date',
        'label'           => 'Event Date',
        'name'            => 'eventDate',
        'type'            => 'date_picker',
        'show_in_graphql' => 1,
      ],
      // … add time, location, virtual link fields similarly …
    ],
    'location' => [[
      ['param'=>'post_type','operator'=>'==','value'=>'event']
    ]]
  ]);

  // Repeat for leadership and contact groups…
}
