from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id: str
    content: str

memos = []
    
app = FastAPI()

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id : str):
    for i in range(len(memos)):
        if memos[i].id == memo_id:
            del memos[i]
            return "메모 삭제 성공"
    return "메모 삭제 실패"

@app.put("/memos/{memo_id}")
def put_memo(memo_id:str, memo:Memo):
    for i in range(len(memos)):
        if memos[i].id == memo_id:
            memos[i] = memo
            return "메모 수정 성공"
    return "메모 수정 실패"

@app.get("/memos")
def read_memo():
    return memos

@app.post("/memos")    
def create_memo(memo:Memo):
    memos.append(memo)
    return "메모 추가 성공"

app.mount("/", StaticFiles(directory="static", html=True), name="static")