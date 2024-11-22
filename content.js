document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM завантажено. Починаємо редагування таблиці.");

    // Затримка для забезпечення того, що всі елементи будуть доступні
    setTimeout(() => {
        updateTableHeaders();
    }, 1000); // Затримка 1 секунда
});

// Функція для зміни вмісту <th> у першому <tr> таблиці
function updateTableHeaders() {
    // Знайти таблицю за ID
    const table = document.querySelector("table#standingstable.stand.otbor_stand");

    if (table) {
        console.log("Таблиця знайдена.");
        // Знайти перший рядок <tr> в таблиці (не тільки в thead, а й у tbody)
        const firstRow = table.querySelector("tbody tr") || table.querySelector("thead tr");

        if (firstRow) {
            console.log("Перший рядок знайдено.");
            // Отримати всі <th> у цьому рядку
            const headers = firstRow.querySelectorAll("th");
            headers.forEach((header, index) => {
                // Перевірити, чи вміст <th> є "-" і замінити його на порядковий номер
                if (header.textContent.trim() === "-") {
                    header.textContent = index + 1; // Порядковий номер
                    console.log(`Замінено <th>: ${index + 1}`);
                }
            });
        } else {
            console.warn("Перший рядок <tr> не знайдено.");
        }
    } else {
        console.warn("Таблицю не знайдено.");
    }
}
