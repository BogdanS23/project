echo "Starting Docker Compose..."
docker-compose up --build
if [ $? -ne 0 ]; then
  echo "Docker Compose up failed"
  exit 1
fi

echo "Docker Compose is up and running."