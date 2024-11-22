// Функція для зміни вмісту <th> у першому <tr> таблиці (для сторінки /standings)
function updateTableHeaders() {
    console.log("Функція updateTableHeaders викликана.");  // Лог для перевірки
    const table = document.querySelector("table#standingstable.stand.otbor_stand");

    if (table) {
        console.log("Таблиця для standings знайдена.");

        const firstRow = table.querySelector("tbody tr");

        if (firstRow) {
            console.log("Перший рядок знайдено.");

            const headers = firstRow.querySelectorAll("th");

            if (headers.length > 0) {
                headers.forEach((header, index) => {
                    if (header.textContent.trim() === "-") {
                        header.textContent = index - 1;
                        console.log(`Замінено <th>: ${index - 1}`);
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

// Функція для зміни вмісту <a> в кожному рядку таблиці на сторінці /problems
function updateProblemTableLinks() {
    console.log("Функція updateProblemTableLinks викликана.");  // Лог для перевірки
    const urlParams = new URLSearchParams(window.location.search);
    const startValue = parseInt(urlParams.get('start') || '0');

    const table = document.querySelector("table#problemstable.t");

    if (table) {
        console.log("Таблиця для problems знайдена.");

        const rows = table.querySelectorAll("tbody tr:not(:first-child)");

        if (rows.length > 0) {
            rows.forEach((row, index) => {
                const pidCell = row.querySelector("td.pid");

                if (pidCell) {
                    const link = pidCell.querySelector("a");

                    if (link) {
                        const newText = `${index + 1 + startValue}`;
                        link.textContent = newText;
                        console.log(`Замінено в <a>: ${newText}`);
                    } else {
                        console.warn("Посилання <a> не знайдено в клітинці <td.pid>.");
                    }
                } else {
                    console.warn("Клітинка <td.pid> не знайдена в рядку.");
                }
            });
        } else {
            console.warn("Рядки <tr> не знайдено або вони всі перші.");
        }
    } else {
        console.warn("Таблицю не знайдено.");
    }
}

// Створюємо спостерігача за змінами в DOM
const observer = new MutationObserver(() => {
    console.log("DOM змінився, перевіряємо URL...");

    const currentURL = window.location.href;
    console.log("Поточний URL:", currentURL);  // Виводимо URL для перевірки

    if (currentURL.includes("/standings")) {
        updateTableHeaders();
    } else if (currentURL.includes("/problems")) {
        updateProblemTableLinks();
    }
});

// Спостерігаємо за змінами в body
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Додатково запускаємо оновлення таблиці одразу після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    const currentURL = window.location.href;
    console.log("Поточний URL при завантаженні сторінки:", currentURL); // Виводимо URL при завантаженні

    if (currentURL.includes("/standings")) {
        updateTableHeaders();
    } else if (currentURL.includes("/problems")) {
        updateProblemTableLinks();
    }
});
