




LOCAL_PATH="$(pwd)"
LOCAL_DB_NAME="delaware_dsa_backend"
LOCAL_DB_USER="root"
LOCAL_DB_PASS="root"


REMOTE_DB_NAME="production_db_name"
REMOTE_DB_USER="production_db_user"
REMOTE_DB_PASS="production_db_password"
REMOTE_DB_HOST="production_db_host"


DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backup_${DATE}.sql"

echo "Exporting local database to ${BACKUP_FILE}..."
wp db export "$BACKUP_FILE" \
  --path="$LOCAL_PATH" \
  --dbuser="$LOCAL_DB_USER" \
  --dbpass="$LOCAL_DB_PASS" \
  --dbname="$LOCAL_DB_NAME"

echo "Replacing local URLs with production domain..."
sed -i '' "s|delaware-dsa-backend.local|your-production-domain.com|g" "$BACKUP_FILE"

echo "Importing into production database..."
mysql -h "$REMOTE_DB_HOST" \
      -u "$REMOTE_DB_USER" \
      -p"$REMOTE_DB_PASS" \
      "$REMOTE_DB_NAME" < "$BACKUP_FILE"

echo "Syncing uploads directory..."
rsync -avz --progress \
  "$LOCAL_PATH/wp-content/uploads/" \
  user@production-server:/var/www/wordpress/wp-content/uploads/

echo "Migration complete!"
