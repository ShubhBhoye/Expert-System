from flask import Flask, request, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Note: Replace this with your actual Groq API Key if needed
API_KEY = os.environ.get("GROQ_API_KEY", "API_KEY")

state = {}

def log_query(query):
    with open("log.txt", "a") as f:
        f.write(query + "\n")

def rule_based_response(query):
    global state
    q = query.lower()
    
    # Greetings
    if any(greet in q for greet in ["hello", "hi", "hey"]):
        return "Hello! I am your Information Management Expert. How can I help you optimize your business systems today?"
        
    # Help menu
    if "help" in q or "menu" in q:
        return "You can ask about: ERP systems, CRM solutions, Document Management (DMS), or Data Integration."
        
    # Lead-in for specific systems
    if "erp" in q:
        return "Enterprise Resource Planning (ERP) is great for consolidating Finance, Inventory, and HR. Are you looking for a cloud-based or on-premise solution?"
    
    if "crm" in q:
        return "CRM systems help track sales and customers. Do you need marketing automation features as well?"
        
    if "dms" in q or "document" in q:
        return "Document Management Systems handle version control and indexing. Is security your primary concern?"

    return None  # fallback to API or clarify

def groq_api_response(query):
    if API_KEY == "API_KEY":
        return "⚠️ Please add your valid Groq API Key to enable advanced AI consultation! Currently running on local rule-based logic."
    
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": "You are an Information Management System (IMS) expert consultant. You specialize in ERP, CRM, DMS, and BI architectures. Provide professional, technical advice based on business needs."},
            {"role": "user", "content": query}
        ]
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return "I'm having trouble connecting to my external knowledge base right now."
    except Exception as e:
        print(f"Error: {e}")
        return "Network error. Please try again later."

def is_known_query(query):
    keywords = ["erp", "crm", "dms", "kms", "hris", "data", "system", "software", "management", "hello", "hi", "help"]
    return any(k in query.lower() for k in keywords)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/ask', methods=['POST'])
def ask():
    req = request.get_json()
    query = req.get("query", "")
    log_query(query)
    
    # Step 1: Rule-based inference
    response = rule_based_response(query)
    
    # Step 2: If unknown -> use API
    if response is None:
        if is_known_query(query):
            response = "That's an interesting requirement. Could you tell me more about your business size and primary pain points?"
        else:
            response = groq_api_response(query)
            
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
