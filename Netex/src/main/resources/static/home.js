console.log("Loaded")

function  hidd_tabs(){
    document.getElementById("add_new_contact").hidden = true;
    document.getElementById("remove_contact").hidden = true;
}

const xhttp = new XMLHttpRequest();

function create_line( items ){
    let rez = "<tr>"
    for(const item of  items){
        rez += `<td> ${item} </td>`
    }
    rez += "</tr>"
    return  rez
}

xhttp.onload = () => {
    let contacts = JSON.parse(xhttp.responseText);
    console.log(contacts)
    let text = " <div class=\"table-responsive\"> <table class=\"table table-striped table-bordered table-hover\">\n" +
        "  <thead class=\"thead-dark\">\n" +
        "    <tr>\n" +
        "      <th scope=\"col\">#</th>\n" +
        "      <th scope=\"col\">Name</th>\n" +
        "      <th scope=\"col\">Address</th>\n" +
        "      <th scope=\"col\">Picture</th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>"
    let row = 1
    for (const elem of contacts) {
        console.log(elem)
        text += create_line([ row++ ,elem.name, elem.address, elem.picture])
    }
    text = text +  "</tbody></table></div>"
    document.getElementById("table").innerHTML = text;
}

function   loadDoc() {
    xhttp.open("GET", "http://localhost:3000/api/v1/contacts", true,);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://localhost/3000")
    xhttp.send();
}

var data = null

async function export2csv(){
    console.log("export2csv")
    hidd_tabs()
    localRequest =  new XMLHttpRequest();
    localRequest.open("GET","http://localhost:3000/api/v1/csv")
    localRequest.onload = () => {

        data = localRequest.responseText
        console.log(data)

        const blob = new Blob([data], {type: 'text/csv'});
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = "my_data.csv";
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }

    }

    localRequest.send()
}

async function removeContact(){
    console.log("removeContact")
    hidd_tabs()
    document.getElementById("remove_contact").hidden = false;
}

async function editContact(){
    console.log("editContact")
    hidd_tabs()
}

async function newConntactSubmit(){
    console.log("newConntactSubmit")
    localRequest =  new XMLHttpRequest();
    let contact = {
        "id" : 0,
        "name" : document.getElementById("form_1_name").value,
        "address" : document.getElementById("form_1_address").value,
        "picture" : document.getElementById("form_1_picture").value,
    }

    localRequest.onload = () =>{
        loadDoc()
    }
    localRequest.open("POST","http://localhost:3000/api/v1/contact")
    localRequest.setRequestHeader("Content-Type", "application/json");
    localRequest.send(JSON.stringify(contact))

    hidd_tabs()
}

async function newConntactCancel(){
    console.log("newConntactCancel")
    hidd_tabs()
}

async function addNewContact(){
    console.log("addNewContact")
    hidd_tabs()
    document.getElementById("add_new_contact").hidden = false;
}

async function deleteConntactSubmit(){
    console.log("deleteConntactSubmit")
    localRequest =  new XMLHttpRequest();
    let contact_name = document.getElementById("form_2_name").value;
    localRequest.onload = () =>{
        loadDoc()
    }
    localRequest.open("DELETE","http://localhost:3000/api/v1/contacts/" + contact_name )
    localRequest.send()
    localRequest.send()
    hidd_tabs()
}

async function deleteConntactCancel(){
    console.log("deleteConntactCancel")
    hidd_tabs()
}


loadDoc()