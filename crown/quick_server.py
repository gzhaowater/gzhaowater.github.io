#!/usr/bin/env python3
"""Quick CROWN data server for testing - runs on port 8080 with CORS."""

import http.server
import os
import sys

DATA_DIR = "/home/ubuntu/CROWN"

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DATA_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {args[0]}")

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    if not os.path.isdir(DATA_DIR):
        print(f"ERROR: {DATA_DIR} not found!")
        sys.exit(1)
    server = http.server.HTTPServer(('0.0.0.0', port), CORSHandler)
    print(f"CROWN data server: http://0.0.0.0:{port}")
    print(f"Serving: {DATA_DIR}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
