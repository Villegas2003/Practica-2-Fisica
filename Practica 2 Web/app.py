from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

# 📌 Función para calcular el tiempo de impulso nervioso
def calcular_tiempo_impulso(distancia):
    velocidad = 100  # m/s
    tiempo = distancia / velocidad
    explicacion = f"<b>Fórmula:</b> t = distancia / velocidad <br> <b>Cálculo:</b> t = {distancia} m / {velocidad} m/s"
    return tiempo, explicacion

# 📌 Función para calcular el crecimiento del cabello
def calcular_tiempo_crecimiento(longitud_inicial, longitud_final):
    tasa_crecimiento = 2  # cm/mes
    tiempo = (longitud_final - longitud_inicial) / tasa_crecimiento
    explicacion = (
        f"<b>Fórmula:</b> t = (longitud final - longitud inicial) / tasa de crecimiento <br>"
        f"<b>Cálculo:</b> t = ({longitud_final} - {longitud_inicial}) cm / {tasa_crecimiento} cm/mes"
    )
    return tiempo, explicacion

# 📌 Función para calcular la aceleración y tiempo del electrón
def calcular_movimiento_electron():
    v0 = 2.00e4  # m/s
    v = 6.00e6   # m/s
    d = 1.50e-2  # m (1.50 cm = 0.015 m)

    # Cálculo de la aceleración y tiempo
    a = (v**2 - v0**2) / (2 * d)
    t = (v - v0) / a

    # Convertimos a notación científica con 2 decimales
    a_formatted = "{:.2e}".format(a).replace("e+0", " × 10^").replace("e-", " × 10^-")
    t_formatted = "{:.2e}".format(t).replace("e+0", " × 10^").replace("e-", " × 10^-")

    explicacion = f"""
    <b>Fórmula de aceleración:</b> a = (v² - v₀²) / (2d) <br>
    <b>Cálculo:</b> a = ((6.00 × 10⁶)² - (2.00 × 10⁴)²) / (2 × 1.50 × 10⁻²) <br>
    <b>Resultado:</b> <span style="color: #0275d8; font-weight: bold;">{a_formatted} m/s²</span>
    <br><br>

    <b>Fórmula de tiempo:</b> t = (v - v₀) / a <br>
    <b>Cálculo:</b> t = (6.00 × 10⁶ - 2.00 × 10⁴) / {a_formatted} <br>
    <b>Resultado:</b> <span style="color: #d9534f; font-weight: bold;">{t_formatted} s</span>
    """

    return a_formatted, t_formatted, explicacion

# 📌 Función corregida para calcular el movimiento de los carritos
def calcular_movimiento_carritos(d_inicial, a1, a2, t):
    if d_inicial <= 0 or a1 <= 0 or a2 <= 0 or t <= 0:
        return None, None, "<b>Error:</b> Todos los valores deben ser mayores que 0."

    d1 = 0.5 * a1 * t**2  
    d2 = 0.5 * a2 * t**2  
    d_total = d_inicial + d1 + d2  
    t_encuentro = math.sqrt((2 * d_inicial) / (a1 + a2))

    d_total_formatted = "{:.2f}".format(d_total)
    t_encuentro_formatted = "{:.2f}".format(t_encuentro)

    explicacion = f"""
    <b>📏 Separación después de {t} s:</b> <br>
    <b>Fórmula:</b> d_total = d_inicial + ½ × a₁ × t² + ½ × a₂ × t² <br>
    <b>Resultado:</b> <span style="color: #0275d8;">{d_total_formatted} m</span>
    <br><br>

    <b>⏳ Tiempo hasta el encuentro:</b> <br>
    <b>Fórmula:</b> t_encuentro = √(2 × d_inicial / (a₁ + a₂)) <br>
    <b>Resultado:</b> <span style="color: #d9534f;">{t_encuentro_formatted} s</span>
    """

    return d_total_formatted, t_encuentro_formatted, explicacion

# 📌 Función para calcular el tiempo perdido por un tren en una parada
def calcular_tiempo_tren():
    vi = 20  # m/s
    a_freno = -1.0  # m/s²
    a_aceleracion = 0.5  # m/s²
    tiempo_parada = 120  # s

    t_frenado = -vi / a_freno
    t_aceleracion = vi / a_aceleracion
    tiempo_total = t_frenado + tiempo_parada + t_aceleracion

    explicacion = (
        f"<b>Tiempo de frenado:</b> {t_frenado:.2f} s <br>"
        f"<b>Tiempo de aceleración:</b> {t_aceleracion:.2f} s <br>"
        f"<b>Tiempo total perdido:</b> {tiempo_total:.2f} s (incluye {tiempo_parada} s de parada)"
    )

    return tiempo_total, explicacion

# 📌 Rutas de la aplicación Flask
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/calcular', methods=['POST'])
def calcular():
    problema = request.form['problema']

    if problema == "1":
        distancia = float(request.form['distancia'])
        resultado, explicacion = calcular_tiempo_impulso(distancia)
        mensaje = f"{explicacion} <br><br> <b>Resultado:</b> {resultado:.6f} s."

    elif problema == "2":
        longitud_inicial = float(request.form['longitud_inicial'])
        longitud_final = float(request.form['longitud_final'])
        resultado, explicacion = calcular_tiempo_crecimiento(longitud_inicial, longitud_final)
        mensaje = f"{explicacion} <br><br> <b>Resultado:</b> {resultado:.2f} meses."

    elif problema == "3":
        a, t, explicacion = calcular_movimiento_electron()
        mensaje = f"{explicacion} <br><br> <b>Aceleración:</b> {a} m/s² <br> <b>Tiempo:</b> {t} s."

    elif problema == "4":
        d_inicial = float(request.form['d_inicial'])
        a1 = float(request.form['a1'])
        a2 = float(request.form['a2'])
        t = float(request.form['t'])
        distancia, tiempo_encuentro, explicacion = calcular_movimiento_carritos(d_inicial, a1, a2, t)
        mensaje = f"{explicacion} <br><br> <b>Distancia final:</b> {distancia} m."

    elif problema == "5":
        tiempo_perdido, explicacion = calcular_tiempo_tren()
        mensaje = f"{explicacion} <br><br> <b>Tiempo perdido:</b> {tiempo_perdido:.2f} s."

    else:
        mensaje = "Opción no válida."

    return jsonify({"mensaje": mensaje})

@app.route('/simulacion')
def simulacion():
    return render_template("simulacion.html")

if __name__ == "__main__":
    app.run(debug=True)

