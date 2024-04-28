from flask import Flask, send_from_directory, send_file, request, jsonify

app = Flask("nextvideo")

@app.route("/api/upload", methods=["POST"])
def api_upload():
    print(f"Uploading video: {request.form["title"]}")
    return jsonify({ "video_url": "/" })

@app.route("/")
def index():
    return send_file("out/index.html")

@app.route("/upload")
def upload():
    return send_file("out/upload.html")

@app.route("/_next/<path:path>", methods = ["GET", "POST"])
def assets(path):
    return send_from_directory("out/_next", path)

if __name__ == "__main__":
    app.run()
