// Функція для зміни вмісту <th> у першому <tr> таблиці
function updateTableHeaders() {
    // Знайти таблицю за ID
    const table = document.querySelector("table#standingstable.stand.otbor_stand");

    if (table) {
        console.log("Таблиця знайдена.");

        // Знайти перший рядок <tr> у таблиці (в середині <tbody>)
        const firstRow = table.querySelector("tbody tr");

        if (firstRow) {
            console.log("Перший рядок знайдено.");

            // Отримати всі <th> у цьому рядку
            const headers = firstRow.querySelectorAll("th");

            // Якщо є <th> елементи
            if (headers.length > 0) {
                headers.forEach((header, index) => {
                    // Перевірити, чи вміст <th> є "-" і замінити його на порядковий номер
                    if (header.textContent.trim() === "-") {
                        header.textContent = index + 1; // Порядковий номер
                        console.log(`Замінено <th>: ${index + 1}`);
                    } else {
                        console.log(`Текст у <th>: "${header.textContent.trim()}" не змінюється.`);
                    }
                });
            } else {
                console.warn("У першому рядку <tr> немає елементів <th>.");
            }
        } else {
            console.warn("Перший рядок <tr> не знайдено.");
        }
    } else {
        console.warn("Таблицю не знайдено.");
    }
}

// Створюємо спостерігач за змінами в DOM
const observer = new MutationObserver(() => {
    console.log("DOM змінився, оновлюємо таблицю...");
    updateTableHeaders(); // Оновлюємо таблицю після зміни
});

// Спостерігаємо за змінами в body
observer.observe(document.body, {
    childList: true, // Спостерігаємо за додаванням нових елементів
    subtree: true // Спостерігаємо за всіма нащадками
});

// Додатково запускаємо оновлення таблиці одразу після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    updateTableHeaders(); // Оновлюємо таблицю після завантаження
});
