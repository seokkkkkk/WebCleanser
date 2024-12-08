from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from datetime import datetime

app = Flask(__name__)

# 첫 번째 모델과 토크나이저 로드: 유해성 필터
hazard_filter_path = "hazard_filter"
hazard_tokenizer = AutoTokenizer.from_pretrained(hazard_filter_path)
hazard_model = AutoModelForSequenceClassification.from_pretrained(hazard_filter_path)

# 두 번째 모델과 토크나이저 로드: 유형 필터
type_filter_path = "type_filter"
type_tokenizer = AutoTokenizer.from_pretrained(type_filter_path)
type_model = AutoModelForSequenceClassification.from_pretrained(type_filter_path)

# 클래스 매핑 정의
class_mapping = {
    0: {"type": "일반", "detail": "해당없음"},
    1: {"type": "사회적 유해", "detail": "정치"},
    2: {"type": "불법 및 위험", "detail": "음란"},
    3: {"type": "정신적 위험", "detail": "우울"},
    4: {"type": "불법 및 위험", "detail": "폭력"},
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # 입력 데이터 확인
    if not data or 'texts' not in data:
        return jsonify({'error': '텍스트 리스트가 없습니다'}), 400

    texts = data['texts']
    print("Received texts:", texts)

    hazardous_texts = []
    overall_hazard = False

    for text in texts:
        print("Processing text:", text)

        # Step 1: 유해성 필터링
        hazard_inputs = hazard_tokenizer(text, return_tensors='pt')
        with torch.no_grad():
            hazard_outputs = hazard_model(**hazard_inputs)
        hazard_predictions = torch.softmax(hazard_outputs.logits, dim=-1)
        hazard_predicted_class = torch.argmax(hazard_predictions, dim=-1).item()
        print("Hazard Predicted class:", hazard_predicted_class)

        if hazard_predicted_class != 0:
            # Step 2: 유형 필터링
            type_inputs = type_tokenizer(text, return_tensors='pt')
            with torch.no_grad():
                type_outputs = type_model(**type_inputs)
            type_predictions = torch.softmax(type_outputs.logits, dim=-1)
            type_predicted_class = torch.argmax(type_predictions, dim=-1).item()
            print("Type Predicted class:", type_predicted_class)

            # 최종 판단: type_filter에서 0번 클래스일 경우 일반으로 처리하고 리스트에 추가하지 않음
            if type_predicted_class != 0:
                # 유해 텍스트로 판별된 경우
                overall_hazard = True
                result = class_mapping.get(type_predicted_class, {"type": "Unknown", "detail": "Unknown"})

                hazardous_texts.append({
                    "original_text": text,
                    "result": result
                })

    # 모든 텍스트가 유해하지 않다고 판정되면 overall_hazard를 False로 설정
    if len(hazardous_texts) == 0:
        overall_hazard = False

    return jsonify({
        "hazard": overall_hazard,
        "hazardous_texts": hazardous_texts,
        "detectTime": datetime.now().isoformat()
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
