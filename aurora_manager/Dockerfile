ARG BUILD_FROM=python:3.13-alpine
FROM ${BUILD_FROM}
RUN pip install --no-cache-dir websockets
COPY app /opt/aurora_manager/app
WORKDIR /opt/aurora_manager/app
ENV PYTHONUNBUFFERED=1 HUD_DATA=/data JM_DATA=/data HUD_CONFIG_DIR=/config JM_CONFIG_DIR=/config
EXPOSE 8099
CMD ["python3", "/opt/aurora_manager/app/server.py"]
