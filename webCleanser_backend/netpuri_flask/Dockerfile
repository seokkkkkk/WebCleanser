FROM python:3.9-slim

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 패키지 설치
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 앱 코드 복사
COPY . .

# Gunicorn 설치
RUN pip install gunicorn

# Gunicorn을 사용하여 Flask 애플리케이션 실행
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
