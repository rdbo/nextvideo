from flask import Flask, send_from_directory, send_file, request, jsonify
import os
import uuid
import json

app = Flask("nextvideo")
app.config["VIDEOS_FOLDER"] = "videos"

@app.route("/api/upload", methods=["POST"])
def api_upload():
    if not "title" in request.form or not "description" in request.form or not "video" in request.files:
        return ("", 400)

    title = request.form["title"]
    description = request.form["description"]
    print(f"Uploading video: {request.form["title"]}")
    video_file = request.files["video"]

    video_id = uuid.uuid4()
    print(f"Video ID: {video_id}")

    video_dir = os.path.join(app.config["VIDEOS_FOLDER"], str(video_id))
    os.mkdir(video_dir)
    print(f"Upload directory: {video_dir}")

    video_file.save(os.path.join(video_dir, "video"))
    video_context = json.dumps({ "title": title, "description": description })
    with open(os.path.join(video_dir, "context.json"), "w") as file:
        file.write(video_context)

    return jsonify({ "video_url": f"/watch?id={video_id}" })

@app.route("/api/watch/<video_id>")
def api_watch(video_id):
    try:
        id = uuid.UUID(video_id)
    except:
        return ("", 400)

    video_file = app.config["VIDEOS_FOLDER"]
    video_file = f"{video_file}/{id}/video"

    return send_file(video_file)

@app.route("/api/video/<video_id>")
def api_video(video_id):
    try:
        id = uuid.UUID(video_id)
    except:
        return ("", 400)

    video_dir = app.config["VIDEOS_FOLDER"]
    video_dir = f"{video_dir}/{id}"
    video_context_file = open(f"{video_dir}/context.json", "r")
    video_context = json.load(video_context_file)
    video_context_file.close()
    video_context["video_url"] = f"/api/watch/{id}"
    return jsonify(video_context)

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
    if not os.path.exists(app.config["VIDEOS_FOLDER"]):
        os.mkdir(app.config["VIDEOS_FOLDER"])
    app.run()
