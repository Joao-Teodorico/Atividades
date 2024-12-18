from fastapi import FastAPI
from pydantic import BaseModel
from threading import Thread
import requests
import time
import uvicorn

app = FastAPI()

class Numeros(BaseModel):
    numero1: float
    numero2: float

@app.post("/multiplicacao")
def multiplicar(numeros: Numeros):
    resultado = numeros.numero1 * numeros.numero2
    return {"resultado": resultado}

def iniciar_servidor():
    config = uvicorn.Config(app, host="127.0.0.1", port=8000, log_level="info")
    server = uvicorn.Server(config)
    server.run()

thread = Thread(target=iniciar_servidor)
thread.start()

time.sleep(2)

dados = {"numero1": 3, "numero2": 4}
resposta = requests.post("http://127.0.0.1:8000/multiplicacao", json=dados)

if resposta.status_code == 200:
    print("Resultado da multiplicação:", resposta.json()["resultado"])
else:
    print("Erro na requisição:", resposta.status_code)
