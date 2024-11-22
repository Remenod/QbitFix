// Очікуємо, поки DOM повністю завантажиться
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM завантажено. Починаємо редагування таблиці.");
    updateTableHeaders();
});

// Функція для зміни вмісту <th> у першому <tr> таблиці
function updateTableHeaders() {
    // Знайти таблицю за ID
    const table = document.querySelector("table#standingstable.stand.otbor_stand");

    if (table) {
        console.log("Таблиця знайдена.");
        // Знайти перший рядок <tr> у таблиці
        const firstRow = table.querySelector("thead tr");
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
