"""Aurora Manager 3.x (ingress): konfigurator dashboardow Aurora Pulse + kopie zapasowe. Tylko biblioteka standardowa i websockets."""
import json, os, sys, traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import manager
import mgr

STATIC = os.path.join(HERE, 'static')
UI_VERSION = '3.1.0'
TYPES = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png'}


class H(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype='application/json'):
        if not isinstance(body, (bytes, bytearray)):
            body = json.dumps(body, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', ctype + ('; charset=utf-8' if ctype.startswith(('text', 'application/json')) else ''))
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        n = int(self.headers.get('Content-Length') or 0)
        return json.loads(self.rfile.read(n) or b'{}')

    def log_message(self, fmt, *a):
        pass

    def do_GET(self):
        if self.path.startswith('/manager'):
            return manager.serve(self, 'GET')
        u = urlparse(self.path); q = parse_qs(u.query); p = u.path.rstrip('/') or '/'
        try:
            if p == '/api/info':
                return self._send(200, {'version': UI_VERSION, 'themes': mgr.THEMES, 'blocks': [{'id': b[0], 'name': b[1], 'icon': b[2]} for b in mgr.BLOCKS],
                                        'views': [{'id': v[0], 'name': v[1], 'icon': v[2]} for v in mgr.VIEWS], 'dockExtra': [{'id': v[0], 'name': v[1], 'icon': v[2]} for v in mgr.DOCK_EXTRA], 'modules': mgr.MODULES})
            if p == '/api/catalog':
                return self._send(200, mgr.catalog())
            if p == '/api/dashboards':
                return self._send(200, mgr.list_records())
            if p.startswith('/api/dashboards/'):
                return self._send(200, mgr.get(p.rsplit('/', 1)[1]))
            name = 'mgr.html' if p in ('/', '/index.html') else p.lstrip('/')
            f = os.path.normpath(os.path.join(STATIC, name))
            if f.startswith(STATIC) and os.path.isfile(f):
                data = open(f, 'rb').read()
                if name.endswith('.html'):
                    data = data.replace(b'__V__', UI_VERSION.encode())
                return self._send(200, data, TYPES.get(os.path.splitext(f)[1], 'application/octet-stream'))
            self._send(404, {'error': 'not found'})
        except KeyError as e:
            self._send(404, {'error': str(e)})
        except Exception as e:
            traceback.print_exc()
            self._send(500, {'error': str(e)})

    def do_POST(self):
        if self.path.startswith('/manager'):
            return manager.serve(self, 'POST')
        p = urlparse(self.path).path.rstrip('/')
        try:
            if p == '/api/propose':
                return self._send(200, mgr.propose(self._body().get('areas') or []))
            if p == '/api/save':
                return self._send(200, mgr.save(self._body()))
            if p == '/api/cards/install':
                return self._send(200, {'messages': mgr.ensure_cards() or ['Karty są aktualne.'], 'cards': mgr.cards_state()})
            self._send(404, {'error': 'not found'})
        except ValueError as e:
            self._send(400, {'error': str(e)})
        except Exception as e:
            traceback.print_exc()
            self._send(500, {'error': str(e)})

    def do_DELETE(self):
        p = urlparse(self.path).path.rstrip('/')
        q = parse_qs(urlparse(self.path).query)
        try:
            if p.startswith('/api/dashboards/'):
                return self._send(200, mgr.delete(p.rsplit('/', 1)[1], q.get('ha', ['1'])[0] == '1'))
            self._send(404, {'error': 'not found'})
        except KeyError as e:
            self._send(404, {'error': str(e)})
        except Exception as e:
            traceback.print_exc()
            self._send(500, {'error': str(e)})


if __name__ == '__main__':
    print('Aurora Manager %s: panel na porcie 8099' % UI_VERSION, flush=True)
    manager.start()
    ThreadingHTTPServer((os.environ.get('HUD_HOST', '0.0.0.0'), int(os.environ.get('HUD_PORT', '8099'))), H).serve_forever()
