ARG BUILD_FROM=python:3.13-alpine
FROM ${BUILD_FROM}
RUN pip install --no-cache-dir websockets
COPY app /opt/hud_scene/app
COPY payload /opt/hud_scene/payload
WORKDIR /opt/hud_scene
ENV PYTHONUNBUFFERED=1 HUD_DATA=/data JM_DATA=/data HUD_CONFIG_DIR=/config JM_CONFIG_DIR=/config HUD_WORKDIR=/tmp
EXPOSE 8099
CMD ["python3", "/opt/hud_scene/app/server.py"]
