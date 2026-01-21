#!/bin/bash

echo "Generando archivos JSON de assets..."
python3 generar.py

PORT=8000

# Comprobar si el puerto está libre
if lsof -i :$PORT >/dev/null; then
    echo "⚠️ Puerto $PORT ocupado. (probablemente ocupado por esta app)."
else
    echo "Puerto $PORT libre. Iniciando servidor local..."
    python3 -m http.server $PORT &
    sleep 1
    open http://localhost:$PORT
fi
