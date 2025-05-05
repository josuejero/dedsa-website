<?php
// Register Event ACF Fields - Export from ACF UI and paste here
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
        'key' => 'group_event_fields',
        'title' => 'Event Details',
        'fields' => array(
            array(
                'key' => 'field_event_date',
                'label' => 'Event Date',
                'name' => 'eventDate',
                'type' => 'date_picker',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_time',
                'label' => 'Event Time',
                'name' => 'eventTime',
                'type' => 'time_picker',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_location',
                'label' => 'Event Location',
                'name' => 'eventLocation',
                'type' => 'text',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_event_virtual_link',
                'label' => 'Virtual Meeting Link',
                'name' => 'eventVirtualLink',
                'type' => 'url',
                'required' => 0,
                'show_in_graphql' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'event',
                ),
            ),
        ),
        'show_in_graphql' => 1,
        'graphql_field_name' => 'eventFields',
    ));
    
    // Leadership ACF Fields
    acf_add_local_field_group(array(
        'key' => 'group_leadership_fields',
        'title' => 'Leadership Details',
        'fields' => array(
            array(
                'key' => 'field_leadership_role',
                'label' => 'Leadership Role',
                'name' => 'role',
                'type' => 'text',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_leadership_email',
                'label' => 'Email',
                'name' => 'email',
                'type' => 'email',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_leadership_order',
                'label' => 'Display Order',
                'name' => 'order',
                'type' => 'number',
                'required' => 1,
                'default_value' => 10,
                'show_in_graphql' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'leadership',
                ),
            ),
        ),
        'show_in_graphql' => 1,
        'graphql_field_name' => 'leadership',
    ));
    
    // Contact Info ACF Fields for Pages
    acf_add_local_field_group(array(
        'key' => 'group_contact_info',
        'title' => 'Contact Information',
        'fields' => array(
            array(
                'key' => 'field_contact_email',
                'label' => 'Email',
                'name' => 'email',
                'type' => 'email',
                'required' => 1,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_contact_phone',
                'label' => 'Phone',
                'name' => 'phone',
                'type' => 'text',
                'required' => 0,
                'show_in_graphql' => 1,
            ),
            array(
                'key' => 'field_mailing_address',
                'label' => 'Mailing Address',
                'name' => 'mailingAddress',
                'type' => 'textarea',
                'required' => 0,
                'show_in_graphql' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page',
                    'operator' => '==',
                    'value' => 'contact',
                ),
            ),
        ),
        'show_in_graphql' => 1,
        'graphql_field_name' => 'contactInfo',
    ));
}