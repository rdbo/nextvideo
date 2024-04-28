from flask import Flask, send_from_directory, send_file, request

app = Flask("nextvideo")

@app.route("/_next/<path:path>", methods = ["GET", "POST"])
def assets(path):
    return send_from_directory("out/_next", path)

@app.route("/")
def index():
    return send_file("out/index.html")

@app.route("/upload", methods=["GET", "POST"])
def webapp():
    if request.method == "GET":
        return send_file("out/upload.html")

    print(f"Uploading video: {request.form["title"]}")
    return "OK"

if __name__ == "__main__":
    app.run()
