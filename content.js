// Для сторінки /standings
function updateTableHeaders() {
    const table = document.querySelector("table#standingstable.stand.otbor_stand");
    if (!table) {
        console.warn("Таблицю standings не знайдено.");
        return;
    }

    const firstRow = table.querySelector("tbody tr");
    if (!firstRow) {
        console.warn("Перший рядок <tr> у таблиці standings не знайдено.");
        return;
    }

    const headers = firstRow.querySelectorAll("th");
    if (headers.length === 0) {
        console.warn("У першому рядку <tr> немає елементів <th>.");
        return;
    }

    headers.forEach((header, index) => {
        const anchor = header.querySelector("a");
        if (anchor) {
            const title = anchor.getAttribute("title");
            if (anchor.textContent.trim().startsWith("-")) {
                const newText = `${index - 1}`;
                anchor.textContent = newText;
                if (title && title.startsWith("-")) {
                    anchor.setAttribute("title", title.replace("-", newText));
                }
            }
        }
    });
}

// Для сторінки /problems
function updateProblemTableLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const startValue = parseInt(urlParams.get("start") || "0", 10);

    const table = document.querySelector("table#problemstable.t");
    if (!table) {
        console.warn("Таблицю problems не знайдено.");
        return;
    }

    const rows = table.querySelectorAll("tbody tr:not(:first-child)");
    if (rows.length === 0) {
        console.warn("Рядки <tr> у таблиці problems не знайдено або вони всі перші.");
        return;
    }

    rows.forEach((row, index) => {
        const pidCell = row.querySelector("td.pid");
        if (!pidCell) {
            console.warn("Клітинка <td.pid> не знайдена в рядку.");
            return;
        }

        const link = pidCell.querySelector("a");
        if (link) {
            const newText = `${index + 1 + startValue}`;
            if (link.textContent.trim() !== newText) {
                link.textContent = newText;
            }
        }
    });
}

// Для сторінки /solutions
function updateSolutionSelectOptions() {
    const form = document.querySelector("form#addsolutionform");
    if (!form) {
        console.warn("Форму addsolutionform не знайдено.");
        return;
    }

    const table = form.querySelector("table#addsolutionformtable");
    if (!table) {
        console.warn("Таблицю addsolutionformtable не знайдено.");
        return;
    }

    const firstRow = table.querySelector("tbody tr");
    if (!firstRow) {
        console.warn("Перший рядок <tr> у таблиці addsolutionformtable не знайдено.");
        return;
    }

    const secondTd = firstRow.querySelectorAll("td")[1];
    if (!secondTd) {
        console.warn("Другий <td> у таблиці addsolutionformtable не знайдено.");
        return;
    }

    const select = secondTd.querySelector("select[name='pid']");
    if (!select) {
        console.warn("<select> у таблиці addsolutionformtable не знайдено.");
        return;
    }

    const options = select.querySelectorAll("option");
    options.forEach((option, index) => {
        if (index !== 0 && option.textContent.trim().charAt(0) === "-") {
            option.textContent = `${index}${option.textContent.trim().substring(1)}`;
        }
    });
}

// Спостерігач за змінами в DOM
const observer = new MutationObserver(() => {
    const currentURL = window.location.href;

    if (currentURL.includes("/standings")) {
        observer.disconnect(); // Відключаємо спостерігача під час оновлення
        updateTableHeaders();
        observer.observe(document.body, { childList: true, subtree: true }); // Знову вмикаємо
    } else if (currentURL.includes("/problems")) {
        observer.disconnect();
        updateProblemTableLinks();
        observer.observe(document.body, { childList: true, subtree: true });
    } else if (currentURL.includes("/solutions")) {
        observer.disconnect();
        updateSolutionSelectOptions();
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

// Спостерігаємо за змінами в body
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Додаткове оновлення при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    const currentURL = window.location.href;
    if (currentURL.includes("/standings")) {
        updateTableHeaders();
    } else if (currentURL.includes("/problems")) {
        updateProblemTableLinks();
    } else if (currentURL.includes("/solutions")) {
        updateSolutionSelectOptions();
    }
});
