# Use the official MinIO image from Quay.io
FROM quay.io/minio/minio

# Set environment variables for MinIO root user and password
ENV MINIO_ROOT_USER=ROOTNAME
ENV MINIO_ROOT_PASSWORD=CHANGEME123

# Expose ports for MinIO server and console
EXPOSE 9000
EXPOSE 9001

# Command to run MinIO server
CMD ["server", "/data", "--console-address", ":9001"]
