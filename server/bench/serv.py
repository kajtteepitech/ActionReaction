from http.server import BaseHTTPRequestHandler, HTTPServer

hostName = "localhost"
serverPort = 8080
users = [
    {"id":1, "name": 'John', "email": 'jonh@gmail.com'},
    {"id":2, "name": 'John1', "email": 'jonh1@gmail.com'},
    {"id":3, "name": 'John2', "email": 'jonh2@gmail.com'},
]

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        for i in users:
            self.wfile.write(bytes("id: %s, name: %s, email: %s, " % (i["id"], i["name"], i["email"]), "utf-8"))

if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")