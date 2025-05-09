


cd "$(dirname "$0")" || exit

echo "Setting up WordPress for Delaware DSA..."





echo "Verifying plugins..."
wp plugin install wp-graphql --activate
wp plugin install advanced-custom-fields --activate
wp plugin install https://github.com/wp-graphql/wp-graphql-acf/archive/refs/tags/v2.4.1.zip --activate
wp plugin install publishpress-authors --activate
wp plugin install redis-cache --activate
wp plugin install wordfence --activate

wp eval-file setup-scripts/custom-post-types.php
wp eval-file setup-scripts/register-acf-fields.php


echo "Creating default pages..."
wp post create --post_type=page --post_title='Home' --post_status=publish
wp post create --post_type=page --post_title='What We Stand For' --post_status=publish
wp post create --post_type=page --post_title='Calendar' --post_status=publish
wp post create --post_type=page --post_title='Leadership' --post_status=publish
wp post create --post_type=page --post_title='Committees' --post_status=publish
wp post create --post_type=page --post_title='Bylaws' --post_status=publish
wp post create --post_type=page --post_title='Contact' --post_status=publish


echo "Creating categories..."
wp term create category "News" --description="General news and updates"
wp term create category "Events" --description="Event announcements and reports"
wp term create category "Statements" --description="Official chapter statements and positions"


echo "Setting permalink structure..."
wp rewrite structure '/%postname%/'
wp rewrite flush

echo "WordPress setup complete!"