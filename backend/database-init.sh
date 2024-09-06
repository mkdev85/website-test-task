set -e

# Wait for PostgreSQL to start
until pg_isready -h "localhost" -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

# Use environment variables for database name
DB_NAME=${POSTGRES_DB}
if [ -z "$DB_NAME" ]; then
  echo "POSTGRES_DB is not set. Exiting."
  exit 1
fi

# Run SQL commands directly to create the database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE "$DB_NAME";
    -- Add any additional SQL commands here
EOSQL

echo "Database initialization completed."