# Setup the database, if not already done
echo "Starting container setup..."
echo "Running database migrations, if there are any."
npm run db:create

echo "Database setup complete!"
echo "Container is ready for use!"
