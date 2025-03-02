
# 🚀 Calculadora Física con Simulación de Tren  

Este proyecto es una **calculadora de problemas físicos** que incluye una **simulación interactiva del movimiento de un tren** en una pista.  

## 🔧 **Instrucciones para Ejecutar el Proyecto**  

### 📌 **1. Instalar Python (si no está instalado)**
Si **Python no está instalado**, sigue estos pasos:

1. Descarga e instala Python desde [python.org](https://www.python.org/downloads/).
2. Durante la instalación, **marca la casilla** que dice `Add Python to PATH`.
3. Luego, verifica la instalación ejecutando en la terminal:
   ```bash
   python --version
   ```
   Si ves un número de versión, Python está instalado correctamente.


### 📌 **2. Clonar el repositorio**  
Ejecuta el siguiente comando en tu terminal:  
```bash
git clone https://github.com/tu-usuario/practica-2-web.git
cd practica-2-web
```

---

### 📌 **3. Crear un entorno virtual**  
```bash
python -m venv venv
```
Luego activa el entorno virtual:

- **Windows:**  
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux:**  
  ```bash
  source venv/bin/activate
  ```

---

### 📌 **4. Instalar dependencias**  
```bash
pip install -r requirements.txt
```

### 📌 **5. Ejecutar el Proyecto**  
```bash
python app.py
```
Luego, abre tu navegador y ve a:
```
http://127.0.0.1:5000/
```

---

## 📂 **Estructura del Proyecto**
```bash
/practica_2_web/
│── static/                      # Archivos estáticos (JS, CSS)
│   │── script.js                 # Lógica interactiva de la calculadora
│   │── train_simulation.js        # Simulación del tren
│   │── styles.css                 # Estilos de la interfaz
│── templates/                     # Archivos HTML
│   │── index.html                 # Página principal
│   │── resultado.html              # Página de resultados
│   │── simulacion.html             # Página de simulación del tren
│── app.py                          # Lógica principal en Flask
│── requirements.txt                 # Lista de dependencias
│── README.md                        # Instrucciones del proyecto
```

---

## 🛠 **Requisitos**
- Python 3.8 o superior  
- Flask  

Para instalar Flask manualmente:
```bash
pip install flask
```

---

🚀 **¡Listo! Ahora puedes ejecutar el proyecto sin problemas!**
