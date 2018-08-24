function saveOptions(e) {
    browser.storage.sync.set({
        colour: document.querySelector("#colour").value
    });
    e.preventDefault();
}

function restoreOptions() {
    var storageItem = browser.storage.managed.get('colour');
    storageItem.then((res) => {
        document.querySelector("#managed-colour").innerText = res.colour;
    });

    var gettingItem = browser.storage.sync.get('colour');
    gettingItem.then((res) => {
        console.log(res);
        document.querySelector("#colour").value = res.colour || 'Firefox red';
    });
}

function saveUrl(e){
    browser.storage.sync.set({
        urls: [
            {id: 1, url: "http://google.com"},
            {id: 2, url: "http://facebook.com"},
        ]
    });
    e.preventDefault();
}

function getUrls(){
    const urls = browser.storage.managed.get('urls');
    while(true){
        urls.then((res) => {
            document.querySelector("#urls").innerHTML =
            `
            <tr>
                <td>${res.url}</td>
                <td data-id="${res.id}"><button>REMOVE</button></td>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', saveUrl);
document.addEventListener('DOMContentLoaded', getUrls);
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);