const goBack = () => window.location.href = "mainPage.html";
const urldb = "http://localhost:3030/api/apps"

const addItemToTheList = (data) => {
    localStorage.setItem('applications', JSON.stringify(JSON.parse(localStorage.getItem('applications')).concat(data)));
}

const addItemToDb = async (data) => {
    try {
        const imageUrl = data.imageUrl;
        const name = data.name;
        const price = data.price;
        const desc = data.desc;
        const companyName = data.companyName;

        var raw = JSON.stringify({
            imageUrl: imageUrl,
            name: name,
            price: price,
            desc: desc,
            companyName: companyName
        });



        const response = await fetch(
            urldb,
            {
                method: 'post', headers: { "Content-Type": "application/json" }, body: raw
            }
        );

        const data = await response.json();

    }
    catch (err) {
        console.error(err, data);
    }
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
        'imageUrl': extractValueFromInput('imageUrl'),
        'name': extractValueFromInput('name'),
        'price': extractValueFromInput('price'),
        'desc': extractValueFromInput('desc'),
        'companyName': extractValueFromInput('companyName'),
    };

}

// const extractValueFromInput = (id) => {
//     const val = document.querySelector(`#${id}`).value;
//     return val;
// }


const uploadApp = () => {

    document.body.style.backgroundColor = "white";
    const appData = createItemDataFromInputs();
    if (validateAppIfo(appData)) {
        document.body.style.backgroundColor = "white";
        addItemToDb(appData);
        goBack();
    }
    else {

        document.body.style.backgroundColor = "red";
        //document.getElementById("continueButton").addEventListener("onclick", uploadApp());
        document.getElementById("continueButton").onclick = uploadApp();
    }
};

const validateAppIfo = (appData) => {


    if (!isNaN(appData['price']) && appData['price'] >= 0 && appData['imageUrl'].length < 301 && appData['name'].length > 3 && appData['name'].length < 31 && appData['desc'].length < 501 && appData['companyName'].length < 31) {

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

document.getElementById("continueButton").addEventListener("click", uploadApp());