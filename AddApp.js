const addItemToTheList = (data) => {
    localStorage.setItem('applications', JSON.stringify(JSON.parse(localStorage.getItem('applications')).concat(data)));
}

const getNextId = () => {
    let id = localStorage.getItem('id');
    localStorage.setItem('id', ++id);

    return id;
}

document.addEventListener("DOMContentLoaded", () => {

});

const createItemDataFromInputs = () => {

    return appData =
    {
        'id': getNextId(),
        'imageUrl': extractValueFromInput('imageUrl'),
        'name': extractValueFromInput('name'),
        'price': extractValueFromInput('price'),
        'desc': extractValueFromInput('desc'),
        'companyName': extractValueFromInput('companyName')
    };

}

// const extractValueFromInput = (id) => {
//     const val = document.querySelector(`#${id}`).value;
//     return val;
// }


const uploadApp = () => {

    const appData = createItemDataFromInputs();
    console.log(appData['price']);
    if (validateAppIfo(appData)) {
        document.body.style.backgroundColor = "white";
        addItemToTheList(appData);
        goBack();
    }
    else {

        document.body.style.backgroundColor = "red";
        document.getElementById("continueButton").onclick = uploadApp();
    }
};

const validateAppIfo = (appData) => {

    if (!isNaN(appData['price']) && appData['price'] >= 0 && isValidUrl(appData['imageUrl']) && appData['imageUrl'].length < 301 && appData['name'].length > 3 && appData['name'].length < 31 && appData['desc'].length < 501 && appData['companyName'].length < 31) {

        return true;
    }

    return false;

}

const isValidUrl = (urlString) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function printToConsoleAll() {

    console.log(extractValueFromInput('imageUrl'))
    console.log(extractValueFromInput('name'))
    console.log(extractValueFromInput('price'))
    console.log(extractValueFromInput('desc'))
    console.log(extractValueFromInput('companyName'))
}

const goBack = () => window.location.href = "mainPage.html";