import os
import json

# Carpeta raíz de assets
assets_root = "assets"

# Extensiones válidas
valid_ext = (".png", ".jpg", ".jpeg", ".avif")

# Buscar todas las subcarpetas dentro de assets
folders = [
    os.path.join(assets_root, name)
    for name in os.listdir(assets_root)
    if os.path.isdir(os.path.join(assets_root, name))
]

# Procesar cada carpeta
for folder in folders:
    files = [
        f"{folder}/{f}" for f in os.listdir(folder)
        if f.lower().endswith(valid_ext)
    ]
    if files:
        json_path = os.path.join(folder, "files.json")
        with open(json_path, "w") as f:
            json.dump(files, f, indent=2)
        print(f"✅ {len(files)} imágenes encontradas en {folder}, archivo {json_path} creado")
    else:
        print(f"⚠️ No se encontraron imágenes en {folder}")


#python3 -m http.server 8000
