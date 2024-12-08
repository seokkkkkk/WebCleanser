
# WebCleanser

![Group 132](https://github.com/user-attachments/assets/f34ac16c-8ce9-4c59-bd72-44b615726a01)

## Demo
[![YouTube Video](https://img.youtube.com/vi/A-pnCqE67OE/0.jpg)](https://www.youtube.com/watch?v=A-pnCqE67OE)


## Table of Contents

1. [Project Introduction](#project-introduction)  
2. [Detailed Development Contents](#detailed-development-contents)  
3. [System Architecture](#system-architecture)  
4. [User Flow Diagram](#user-flow-diagram)  
5. [Feature Specifications](#feature-specifications)  
6. [Execution and Testing Environment](#execution-and-testing-environment)  

---

## <a id="project-introduction"></a> 1. Project Introduction

**WebCleanser** is a **web content filtering extension** designed to protect users from various online threats and provide a safe browsing experience.

WebCleanser is compatible with most Chromium-based browsers (Chrome, Microsoft Edge, Brave, Arc, Naver Whale, etc.) and is developed as an open-source software project, allowing customization and feature extensions for different languages and purposes.

### Background and Necessity

The advancement of internet technology has led to the proliferation of vast amounts of content online. However, this has also increased risks like phishing, hacking, and harmful content. Users unfamiliar with digital environments are especially vulnerable to these risks.

WebCleanser aims to reduce the **digital divide** by offering intuitive features that protect users from cyber threats, ensuring they can browse the internet safely and confidently.

### Core Features and Workflow

![5 주요 기능 및 작동 과정 url 필터링](https://github.com/user-attachments/assets/b46e5816-2cff-46c7-9fe5-e57f6a7130ad)

1. **URL Filtering**:  
   - Detects and validates links using **Google Safe Browsing API**. Suspicious or phishing websites are blocked, and users can only proceed if the site is verified as safe.  
   - Users can report incorrectly blocked sites to Google to contribute to system improvements.

![7 주요 기능 및 작동 과정 댓글 필터링](https://github.com/user-attachments/assets/2a226d8d-e0bd-419f-a52b-bcb09cc2316d)

2. **Comment Filtering**:  
   - Analyzes comments on **Naver News** and **YouTube** using **AI-based filtering**.  
   - Built on the **KcElectra** model, it classifies comments into categories such as political, sexual, depressive, and aggressive remarks. Users can customize filtering preferences.  
   - A two-stage filtering system (**Hazard Filter** and **Type Filter**) improves accuracy by first identifying harmful comments and then categorizing their types.  

### Open-Source Software

- WebCleanser is licensed under **MIT License**. Detailed license information can be found in each component folder (WebCleanser_backend, WebCleanser_extension, WebCleanser_model).  
- Users are allowed to expand, customize, and integrate WebCleanser for various software development purposes.

---

## <a id="detailed-development-contents"></a> 2. Detailed Development Contents

The project is divided into three core components: **Model**, **Backend**, and **Extension**.

### 2.1. Model

![9 ai 모델](https://github.com/user-attachments/assets/a6e9b066-f90e-4b98-b222-5afea9d3ba96)

We used the **KcElectra** model, a Korean-language Transformer-based AI model, for training comment filtering.  

#### 2.1.1 Dataset Overview

The model was trained on 200,000 comments, combining open datasets and crawled data, with a classification accuracy of approximately 80%.  

- **Korean Hate Speech Dataset**  
- **AIHub Korean Sentiment Data**  
- **YouTube API Data**  
- **Text Ethics Verification Dataset**  
- **Korean Sentiment Dialog Corpus**

#### 2.1.2 Model Training

The filtering system is structured in two stages:  

1. **Hazard Filter**: Classifies comments as either **safe** or **harmful**.  
2. **Type Filter**: Further categorizes harmful comments into specific types:  
   - 0: Normal  
   - 1: Political  
   - 2: Sexual  
   - 3: Depressive  
   - 4: Aggressive  

---

### 2.2. Backend

- **Spring**: Handles URL filtering requests using the Google Safe Browsing API and integrates with Flask for AI comment filtering.  
- **Flask**: Hosts the trained **KcElectra** model and processes filtering requests.

---

### 2.3. Extension

- Developed in **React**, the extension serves as the user interface.  
- Uses **chrome-extension-boilerplate-react** for streamlined development.  

---

## <a id="system-architecture"></a> 3. System Architecture

The system consists of the following components:

- **Server**: Hosted on AWS EC2 using **Docker Compose**.  
  - Spring handles Google Safe Browsing API requests.  
  - Flask processes AI-based comment filtering.  
- **Client**: Built in React, the extension handles link validation and comment filtering.

![image](https://github.com/user-attachments/assets/c2e55924-871a-4543-8e40-6d181235a1c1)

---

## <a id="user-flow-diagram"></a> 4. User Flow Diagram

![image 1](https://github.com/user-attachments/assets/4ea6b408-6890-4051-b78e-2b99be6ea901)

---

## <a id="feature-specifications"></a> 5. Feature Specifications

### URL Filtering

- **Phishing Detection Toggle**: Enable/disable phishing site detection.  
- **Ignore Button**: Bypass warnings to access a page.  
- **Report Incorrect Blocking**: Report errors to Google.  

### Comment Filtering

- **Filter Type Selection**: Customize comment filtering categories.  
- **Show/Hide Harmful Text**: Toggle visibility of harmful comments.  

### Statistics

- **View Statistics**: Access statistics for URL and comment filtering.  
- **Sorting and Filtering**: Sort URLs and comments by date and type.

---

## <a id="execution-and-testing-environment"></a> 6. Execution and Testing Environment

### 6.1 Testing Environment

- **Hardware**: MacBook Pro 14-inch (Apple M3 Pro)  
- **Software**: IntelliJ IDEA, Visual Studio Code, Node.js, Chrome  

### 6.2 Execution Steps

#### 6.2.1 Backend

1. Clone `WebCleanser_backend`.  
2. Install dependencies: `pip install -r requirements.txt`.  
3. Run Flask server: `app.py`.  
4. Set up the Spring backend with JDK 17 and update `application.properties` with the Google API key.  
5. Run the Spring server: `NetpuriServerApplication.java`.

#### 6.2.2 Frontend (Extension)

1. Clone `WebCleanser_extension`.  
2. Install dependencies: `npm install`.  
3. Build the extension: `NODE_ENV=production npm run build`.  
4. Load the unpacked extension in Chrome:  
   - Navigate to `chrome://extensions`.  
   - Enable Developer Mode and load the unpacked folder.  
5. Pin WebCleanser to the Chrome toolbar and restart the browser.
