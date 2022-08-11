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

const uploadApp = () => (addItemToTheList(createItemDataFromInputs()));

function printToConsoleAll() {

    console.log(extractValueFromInput('imageUrl'))
    console.log(extractValueFromInput('name'))
    console.log(extractValueFromInput('price'))
    console.log(extractValueFromInput('desc'))
    console.log(extractValueFromInput('companyName'))
}

const goBack = () => window.location.href = "mainPage.html";