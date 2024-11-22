// ������� ��� ���� ����� <th> � ������� <tr> �������
function updateTableHeaders() {
    // ������ ������� �� ID
    const table = document.querySelector("table#standingstable.stand.otbor_stand");

    if (table) {
        // ������ ������ ����� <tr> � �������
        const firstRow = table.querySelector("thead tr");
        if (firstRow) {
            // �������� �� <th> � ����� �����
            const headers = firstRow.querySelectorAll("th");
            headers.forEach((header, index) => {
                // ���������, �� ���� <th> � "-" � ������� ���� �� ���������� �����
                if (header.textContent.trim() === "-") {
                    header.textContent = index + 1; // ���������� �����
                }
            });
            console.log("���� <th> ������ ��������.");
        } else {
            console.warn("������ ����� <tr> �� ��������.");
        }
    } else {
        console.warn("������� �� ��������.");
    }
}

// ������ �������
updateTableHeaders();
