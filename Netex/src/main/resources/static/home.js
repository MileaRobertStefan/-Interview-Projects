console.log("Loaded")

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


    document.getElementById("demo").innerHTML = text;
}



function   loadDoc() {

    xhttp.open("GET", "http://localhost:3000/api/v1/contacts", true,);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "http://localhost/3000")
    xhttp.send();
}