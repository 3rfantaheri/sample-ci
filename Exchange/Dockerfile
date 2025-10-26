ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim AS base

WORKDIR /app

# Install deps
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt ./
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Copy source code
COPY . .

# Non-root
RUN groupadd --system --gid 1000 app \
    && useradd --system --create-home --uid 1000 --gid 1000 app \
    && chown -R app:app /app
USER app
EXPOSE 8000

# ENTRYPOINT
ENTRYPOINT ["gunicorn", "Exchange.wsgi:application"]
CMD ["--bind=0.0.0.0:8000", "--workers=3", "--access-logfile=-", "--log-level=info"]