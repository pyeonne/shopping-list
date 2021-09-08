const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

// 현업에서는 그대로 설명하는 주석은 필요하지 않고 오히려 가독성을 떨어뜨린다.
// 가능하면 '왜' 의도를 작성해라

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    // text에 내용이 없으면 동작X
    if (text === '') {
        // input에 focus가 되어 있는 상태에서 버튼을 누르면 focus가 버튼으로 옮겨오기 때문이다.
        // 그래서 input에 focus가 사라지므로 input.focus()를 다시 작성함.
        input.focus();
        return;
    }

    // 2. 새로운 아이템을 만듦 (텍스트 + 삭제 버튼)
    const item = createItem(text);

    // 3. items 컨테이너 안에 새로 만든 아이템을 추가함
    items.appendChild(item);

    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({ block: 'center' });

    // 5. input을 초기화 함
    input.value = '';
    input.focus(); // 사용자가 item을 추가할 때마다 input을 클릭할 필요가 없어진다.
}

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const name = document.createElement('span');
    name.setAttribute('class', 'item__name');
    name.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // i 태그는 계속 바뀌지 않기 때문에 직접 넣어줌
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(name);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);
    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        onAdd();
    }
});
