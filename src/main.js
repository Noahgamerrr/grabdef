import XMLHttpRequest from 'xhr2';

function getDef() {
    const Http = new XMLHttpRequest();
    const regex = /<meta\sname="description".*>/g;
    const url='https://www.dictionary.com/browse/corrugated-iron';
    Http.open("GET", url);
    
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            printDef(Http.responseText.match(regex));
        }
    }

    Http.send();
}

getDef();

function printDef(def) {
    console.log(def);
}