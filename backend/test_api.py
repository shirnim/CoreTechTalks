import traceback
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
try:
    res = client.post('/api/jobs/verify-linkedin', json={'username':'test','password':'pwd'})
    print(res.status_code, res.text)
except Exception as e:
    traceback.print_exc()
