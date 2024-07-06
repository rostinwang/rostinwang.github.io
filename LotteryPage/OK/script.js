let drawnNames = [];

function drawNames() {
    const names = document.getElementById('nameList').value.split(/[\n,]+/);
    const numberToDraw = parseInt(document.getElementById('numberToDraw').value);
    const resultDiv = document.getElementById('result');

    if (numberToDraw > names.length) {
        resultDiv.innerHTML = '<p>要抽出的數量不能大於總人數。</p>';
        return;
    }

    const shuffledNames = names.sort(() => 0.5 - Math.random());
    drawnNames = shuffledNames.slice(0, numberToDraw);

    resultDiv.innerHTML = '';
    drawnNames.forEach((name, index) => {
        resultDiv.innerHTML += `<p>${index + 1}. ${name.trim()}</p>`;
    });
}

function exportToExcel() {
    if (drawnNames.length === 0) {
        alert('請先進行抽籤');
        return;
    }

    const wb = XLSX.utils.book_new();
    const wsData = [['編號', '姓名']];

    drawnNames.forEach((name, index) => {
        wsData.push([index + 1, name.trim()]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, '抽籤結果');

    XLSX.writeFile(wb, '抽籤結果.xlsx');
}

function clearNames() {
    document.getElementById('nameList').value = '';
    document.getElementById('numberToDraw').value = '';
    document.getElementById('result').innerHTML = '';
    drawnNames = [];
}

