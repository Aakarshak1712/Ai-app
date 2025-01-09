from flask import Flask, jsonify, request
from flask_cors import CORS
import openai

# Set up Flask app
app = Flask(__name__)
CORS(app)

# OpenAI API key
openai.api_key = "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"

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the AI Chat App!"})

@app.route("/data", methods=["POST"])
def chat_with_ai():
    user_message = request.json.get("message", "")
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Call OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
    )
    assistant_response = response["choices"][0]["message"]["content"]

    return jsonify({"success": True, "data": assistant_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
