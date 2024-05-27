# Use a Python base image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Copy requirements.txt to the container
COPY requirements.txt .

# Install necessary tools and dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    pkg-config \
    libprotobuf-dev \
    protobuf-compiler \
    build-essential \
    && apt-get clean


# Install Python dependencies
RUN python -m venv /venv
RUN . /venv/bin/activate
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your FastAPI app runs on
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
