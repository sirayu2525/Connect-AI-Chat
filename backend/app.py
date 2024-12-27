import openai
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from openai import OpenAI
from dotenv import load_dotenv
import os

# .envファイルを読み込む
load_dotenv(override=True)

app = Flask(__name__)

# 環境変数からデータベースの接続情報を取得
db_uri = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

db = SQLAlchemy(app)

# 環境変数からOpenAI APIキーを取得
openai_api_key = os.environ.get('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)


# AI APIとの通信処理を行う関数を定義
def get_ai_response(ai_name, message):
    if ai_name == 'ChatGPT':
        try:
            # ChatGPT APIを呼び出す
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # モデルを指定
                messages=[
                    {"role": "system", "content": "あなたは親切なAIアシスタントです。"},
                    {"role": "user", "content": message},
                ]
            )
            # レスポンスから回答テキストを抽出
            return response.choices[0].message.content.strip()
        except openai.error.OpenAIError as e:
            # エラーが発生した場合の処理
            print(f"ChatGPT APIエラー: {e}")
            return "ChatGPT APIとの通信でエラーが発生しました。"
    elif ai_name == 'Gemini':
        # Gemini APIとの通信処理
        response = "Geminiの回答です。"  # ← Gemini APIを呼び出すコードに置き換える
    elif ai_name == 'Claude':
        # Claude APIとの通信処理
        response = "Claudeの回答です。"  # ← Claude APIを呼び出すコードに置き換える
    else:
        response = "無効なAI名です。"
    return response

@app.route('/api/ai', methods=['POST'])
def ai_endpoint():
    data = request.get_json()
    message = data.get('message')
    selected_ai = data.get('selectedAI')

    responses = {}
    for ai_name in selected_ai:
        responses[ai_name] = get_ai_response(ai_name, message)

    return jsonify(responses)

if __name__ == '__main__':
    app.run(debug=True)