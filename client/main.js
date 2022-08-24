const url = "http://localhost:3030/api/apps"

const getData = () => {
    if (localStorage.getItem('applications') == null) {
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('id', id);
    }

    return JSON.parse(localStorage.getItem('applications'));
}

document.addEventListener("DOMContentLoaded", () => {

});


const showAppsData = async () => {

    let nameFilter = '';

    nameFilter = extractValueFromInput("form1");

    const res = await fetch(url + `/${nameFilter}`, { method: 'get', headers: { "Content-Type": "application/json" } })

    const data = await res.json();


    let html = data.map((app) => {
        return `
        <div class="d-flex flex-row">
            <img src="${app.imageUrl}" />
            <div class="d-flex flex-column">
                <h2>${app.name}</h2>
                <h3>${app.desc}</h3>
                <p>price: ${app.price}$</p>
                <p>company name: ${app.companyName}</p>
            </div>
        </div>`//************************************************************************
    }).join('\n');

    const appList = document.getElementById("appList");
    appList.innerHTML += html;
}

function switchToAddApplication() {
    window.location.href = "addApplication.html"
}

const extractValueFromInput = (id) => {
    const val = document.querySelector(`#${id}`).value;
    return val;
}

