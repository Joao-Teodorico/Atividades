from flask import Flask, request, jsonify
from werkzeug.serving import make_server
import threading
import requests
import time

app = Flask(__name__)

@app.route("/soma", methods=['POST'])
def somar():
    dados = request.get_json()
    numero1 = dados.get("numero1", 0)
    numero2 = dados.get("numero2", 0)
    resultado = numero1 + numero2
    return jsonify({"resultado": resultado})

class ThreadedServer(threading.Thread):
    def __init__(self, app):
        threading.Thread.__init__(self)
        self.srv = make_server('127.0.0.1', 5000, app)
        self.ctx = app.app_context()
        self.ctx.push()

    def run(self):
        self.srv.serve_forever()

    def shutdown(self):
        self.srv.shutdown()

servidor = ThreadedServer(app)
servidor.start()

time.sleep(2)

dados = {"numero1": 5, "numero2": 7}
resposta = requests.post("http://127.0.0.1:5000/soma", json=dados)

if resposta.status_code == 200:
    print("Resultado da soma:", resposta.json()["resultado"])
else:
    print("Erro na requisição:", resposta.status_code)

servidor.shutdown()
