FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /opt/deception
COPY deception.py /opt/deception/deception.py

# Numeric non-root identity; CI additionally supplies network=none, a read-only
# root filesystem, dropped capabilities and an ephemeral noexec /work mount.
USER 10001:10001
ENTRYPOINT ["python", "/opt/deception/deception.py"]
