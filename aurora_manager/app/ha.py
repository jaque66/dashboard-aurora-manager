"""Dostep do Home Assistanta przez Supervisor (REST i WebSocket)."""
import asyncio, json, os, urllib.request
import websockets

TOKEN = os.environ.get('SUPERVISOR_TOKEN', '')


def api(path, method='GET', body=None):
    req = urllib.request.Request('http://supervisor/core/api/' + path, method=method, headers={'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json'},
                                 data=json.dumps(body).encode() if body is not None else None)
    return json.load(urllib.request.urlopen(req, timeout=30))


async def ws_connect():
    ws = await websockets.connect('ws://supervisor/core/websocket', max_size=None)
    await ws.recv()
    await ws.send(json.dumps({'type': 'auth', 'access_token': TOKEN}))
    await ws.recv()
    return ws


class Conn:
    def __init__(self, ws):
        self.ws, self.n = ws, 0

    async def call(self, msg):
        self.n += 1
        await self.ws.send(json.dumps({'id': self.n, **msg}))
        while True:
            r = json.loads(await self.ws.recv())
            if r.get('id') == self.n:
                return r
