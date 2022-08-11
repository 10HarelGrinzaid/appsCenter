const getData = () => {
    if (localStorage.getItem('applications') == null) {
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('id', id);
    }

    return JSON.parse(localStorage.getItem('applications'));
}

document.addEventListener("DOMContentLoaded", () => {

});


const showAppsData = () => {

    let filt = '';

    filt = extractValueFromInput("form1");

    console.log(filt);

    //const appsJASON = getData();

    //console.log(appsJASON);
    const element = document.getElementById('appList');

    var child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }


    var newAppsArray = getData().filter(function (app) {

        const regexp = new RegExp(filt, 'i');

        return regexp.test(app['name']);
    });



    console.log(newAppsArray);

    newAppsArray.forEach(app => {

        const divAppInfo = document.createElement("div");

        const appInfo = document.createElement("ul");
        const appInfoName = document.createElement("li");
        const appInfoPrice = document.createElement("li");

        appInfoPrice.classList.add("list-group-item");
        appInfoPrice.classList.add("list-group-item-action");
        appInfoPrice.classList.add("list-group-item-primary");

        appInfoName.classList.add("list-group-item");
        appInfoName.classList.add("list-group-item-action");
        appInfoName.classList.add("list-group-item-primary");

        const nameNode = document.createTextNode(app['name']);
        const priceNode = document.createTextNode(app['price']);

        var documentFragment = document.createDocumentFragment();


        appInfoPrice.appendChild(nameNode);
        appInfoName.appendChild(priceNode);

        documentFragment.appendChild(appInfo);

        appInfo.appendChild(appInfoPrice);
        appInfo.appendChild(appInfoName);

        divAppInfo.appendChild(documentFragment);



        element.appendChild(divAppInfo);
    }
    );
}

function switchToAddApplication() {
    window.location.href = "addApplication.html"
}

const extractValueFromInput = (id) => {
    const val = document.querySelector(`#${id}`).value;
    return val;
}

