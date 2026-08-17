from flask import Flask, render_template
import os

print("DIRETÓRIO:", os.getcwd())
print("ARQUIVOS:", os.listdir("."))
print("TEMPLATES EXISTE:", os.path.exists("templates"))
print("INDEX EXISTE:", os.path.exists("templates/index.html"))

app = Flask(__name__)

@app.route("/")
def index():
        return render_template("index.html")

        if __name__ == "__main__":
                app.run(debug=True, host="0.0.0.0", port=8080)
                