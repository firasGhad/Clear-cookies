

let cookies = [], table, keys;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    try {
        chrome.tabs.sendMessage(tabs[0].id, { action: "get_cookies" }, response => {
            $('table').html('');
            $("table").hide();
            cookies = response;
            if ((Array.isArray(response) && response.length > 0)) {
                table = document.querySelector("table");
                keys = Object.keys(response[0]);
                generateTableHead(table, keys);
                generateTable(table, cookies);
                $("table").show();
            }else{
                $('#clear_cookies').prop('disabled', true);
            }
        })
    } catch (err) {
        $('table').append('<h1>No Cookies were found</h1>');
    }
})

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
        
            cell.setAttribute('style', 'word-break: break-all')
            cell.appendChild(text);
        }
    }
}
$(document).on('click', '#clear_cookies', (e) => {
    chrome.runtime.sendMessage({action: "clear_cookies"}, res => {
      if(res == 'Deleted'){
        $('table').html('');
      }
     })
})



