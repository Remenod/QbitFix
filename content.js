//для сторінки /standings
function updateTableHeaders() {
    const table = document.querySelector("table#standingstable.stand.otbor_stand");
    if (table) {        
        const firstRow = table.querySelector("tbody tr");
        if (firstRow) {            
            const headers = firstRow.querySelectorAll("th");
            if (headers.length > 0) {
                headers.forEach((header, index) => {
                    const anchor = header.querySelector("a");
                    if (anchor) {
                        if (anchor.textContent.trim().startsWith("-")) {
                            const newText = `${index - 1}`;
                            anchor.textContent = newText;
                            anchor.setAttribute("title", anchor.getAttribute("title").replace("-", newText));
                        }
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

//для сторінки /problems
function updateProblemTableLinks() {    
    const urlParams = new URLSearchParams(window.location.search);
    const startValue = parseInt(urlParams.get('start') || '0');
    const table = document.querySelector("table#problemstable.t");
    if (table) {        
        const rows = table.querySelectorAll("tbody tr:not(:first-child)");
        if (rows.length > 0) {
            rows.forEach((row, index) => {
                const pidCell = row.querySelector("td.pid");
                if (pidCell) {
                    const link = pidCell.querySelector("a");
                    if (link) {
                        const newText = `${index + 1 + startValue}`;
                        link.textContent = newText;
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

//для сторінки /solutions
function updateSolutionSelectOptions() {    
    const form = document.querySelector("form#addsolutionform");
    if (form) {        
        const table = form.querySelector("table#addsolutionformtable");
        if (table) {            
            const firstRow = table.querySelector("tbody tr");
            if (firstRow) {                
                const secondTd = firstRow.querySelectorAll("td")[1];
                if (secondTd) {
                    const select = secondTd.querySelector("select[name='pid']");
                    if (select) {
                        const options = select.querySelectorAll("option");
                        options.forEach((option, index) => {
                            if (index !== 0) {                                
                                if (option.textContent.trim().charAt(0) === "-") {
                                    option.textContent = `${index}` + option.textContent.trim().substring(1);
                                }
                            }
                        });
                    } else {
                        console.warn("<select> не знайдено.");
                    }
                } else {
                    console.warn("Другий <td> не знайдено.");
                }
            } else {
                console.warn("Перший рядок <tr> не знайдено.");
            }
        } else {
            console.warn("Таблицю не знайдено.");
        }
    } else {
        console.warn("Форму не знайдено.");
    }
}

// Спостерігач за змінами в DOM
const observer = new MutationObserver(() => {
    console.log("DOM змінився, перевіряємо URL...");
    const currentURL = window.location.href;
    console.log("Поточний URL:", currentURL);

    if (currentURL.includes("/standings")) {
        updateTableHeaders();
    } else if (currentURL.includes("/problems")) {
        updateProblemTableLinks();
    } else if (currentURL.includes("/solutions")) {
        updateSolutionSelectOptions();
    }
});

// Спостерігаємо за змінами в body
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Додатково запускаємо оновлення при завантаженні сторінки
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
