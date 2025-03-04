const deleteMemo = async (e) => {
    const id = e.target.dataset.id;
    console.log(id);

    const res = await fetch(`/memos/${id}`, {
        method: "DELETE",
    });
    readMemo();
};

const editMemo = async (e) => {
    const id = e.target.dataset.id;
    const editInput = prompt("수정할 내용을 입력하세요.");

    const res = await fetch(`/memos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            content: editInput,
        }),
    });
    readMemo();
};

function displayMemo(memo) {
    const memoList = document.querySelector("#memo-list");
    const memoItems = document.createElement("li");
    const btnEdit = document.createElement("button");
    const btnDel = document.createElement("button");

    memoItems.innerText = `[${memo.id}] ${memo.content}`;

    btnEdit.innerText = "수정";
    btnEdit.type = "button";
    btnEdit.classList.add("btn-update");
    btnEdit.dataset.id = memo.id;

    btnDel.innerText = "삭제";
    btnDel.type = "button";
    btnDel.classList.add("btn-del");
    btnDel.dataset.id = memo.id;

    memoList.appendChild(memoItems);
    memoItems.appendChild(btnEdit);
    memoItems.appendChild(btnDel);

    btnEdit.addEventListener("click", editMemo);
    btnDel.addEventListener("click", deleteMemo);
}

async function readMemo() {
    const res = await fetch("/memos");
    const jsonRes = await res.json();
    const memoList = document.querySelector("#memo-list");
    // console.log(jsonRes);
    memoList.innerHTML = "";
    jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
    const now = new Date();
    const formattedDate = // 현재 시간을 yyyy-mm-dd hh:mm:ss 형식으로 변환
        now.toLocaleDateString("ko-KR", {
            // 한국 시간으로 표시
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            hour12: false, // 24시간제
        });
    const res = await fetch("/memos", {
        // POST /memos 요청
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: formattedDate,
            content: value,
        }),
    });
    const jsonRes = await res.json();
    console.log(jsonRes);

    readMemo();
}

function handleSubmit(e) {
    e.preventDefault();
    const input = document.querySelector("#memo-input");
    createMemo(input.value);
    input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
