let totalSeats = 0;
let drawnSeats = [];
let seatElements = [];
let excludeSeats = [];

function generateSeats() {
    totalSeats = parseInt(document.getElementById('totalSeats').value, 10);
    excludeSeats = document.getElementById('excludeSeats').value.split(',').map(Number).filter(num => !isNaN(num));
    const container = document.getElementById('seatsContainer');
    container.innerHTML = '';
    seatElements = [];
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        if (excludeSeats.includes(i)) {
            seat.classList.add('excluded');
        }
        seat.textContent = i;
        container.appendChild(seat);
        seatElements.push(seat);
    }
    drawnSeats = [];
    document.getElementById('drawnSeats').innerHTML = '';
}

function drawSeats() {
    let drawCount = parseInt(document.getElementById('drawCount').value, 10);
    let availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(seat => !drawnSeats.includes(seat) && !excludeSeats.includes(seat));

    if (drawCount > availableSeats.length) {
        alert('可用座號不足，只能抽取剩餘座號');
        drawCount = availableSeats.length;
    }

    const drawn = [];
    while (drawn.length < drawCount && availableSeats.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSeats.length);
        const drawnSeat = availableSeats.splice(randomIndex, 1)[0];
        drawnSeats.push(drawnSeat);
        drawn.push(drawnSeat);
    }

    drawn.forEach(seatNumber => {
        const seatElement = seatElements.find(element => parseInt(element.textContent, 10) === seatNumber);
        if (seatElement) {
            seatElement.classList.add('drawn', 'highlight');
            setTimeout(() => seatElement.classList.remove('highlight'), 500);
        }
    });

    document.getElementById('drawnSeats').textContent = `抽取的學生座號: ${drawn.join(', ')}`;

    // 添加抽籤結果到歷史記錄
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = `抽取的學生座號: ${drawn.join(', ')}`;
    historyList.prepend(historyItem);
}

function resetDraw() {
    drawnSeats = [];
    seatElements.forEach(seat => seat.classList.remove('drawn'));
    document.getElementById('drawnSeats').innerHTML = '';
    document.getElementById('historyList').innerHTML = ''; // 重置歷史記錄
    document.getElementById('groups').innerHTML = ''; // 清空分組結果
}

function generateGroups() {
    const groupCountInput = document.getElementById('groupCount');
    const groupCount = groupCountInput ? parseInt(groupCountInput.value, 10) : Math.ceil(totalSeats / 5); // 默認每組5人
    const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(seat => !excludeSeats.includes(seat));
    const groups = Array.from({ length: groupCount }, () => []);

    let groupIndex = 0;
    while (availableSeats.length) {
        const randomIndex = Math.floor(Math.random() * availableSeats.length);
        const seat = availableSeats.splice(randomIndex, 1)[0];
        groups[groupIndex].push(seat);
        groupIndex = (groupIndex + 1) % groupCount;
    }

    const groupColors = ['#ADD8E6', '#FFB6C1']; // 粉藍色和粉紅色

    const groupsContainer = document.getElementById('groups');
    groupsContainer.innerHTML = '';
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.style.backgroundColor = groupColors[index % 2];
        const groupTitle = document.createElement('h3');
        groupTitle.textContent = `組 ${index + 1}`;
        groupDiv.appendChild(groupTitle);
        const groupMembers = document.createElement('p');
        groupMembers.textContent = `成員: ${group.join(', ')}`;
        groupDiv.appendChild(groupMembers);
        groupsContainer.appendChild(groupDiv);
    });
}