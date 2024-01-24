// console.log("hello")

let manifestCartons = []
let scannedCartons = []
let unexpectedCartons = []

function addManifestCartons(){
    event.preventDefault();
    var enteredCartonNumberField = document.getElementById("cartonNumber");
    //Get only the last six characters of the carton number entered
    let enteredCarton = enteredCartonNumberField.value.slice(-6);
    
    //Check if entered value is number.
    if (enteredCarton.match(/^[0-9]+$/)){

        //Check if entered value has already been entered. 
        //If so, display error, clear input field and focus cursor for new input.
        if (manifestCartons.includes(enteredCarton)){
            console.log(`Carton already entered`)
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            return;
        }

        manifestCartons.push(enteredCarton);
        // console.log(`Scanned: ${enteredCarton}`);
        enteredCartonNumberField.value = "";
        enteredCartonNumberField.focus();
        console.log(manifestCartons);
        //Set manifest carton counter
        document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length

        //Create visible list of cartons on manifest
        createManifestCartonList();

        return;
    }
    //If entered value isn't a number, display error and clear input field
    console.log(`Enter a number`)
    enteredCartonNumberField.value = "";
    return;
}

function removeCartonNumber(){
    event.preventDefault();
    var enteredCartonNumberField = document.getElementById("cartonNumber");
    let enteredCarton = enteredCartonNumberField.value.slice(-6);
    if (manifestCartons.length==0){
        console.log(`No cartons in list to remove`);
        return;
    }
    if (enteredCarton.match(/^[0-9]+$/)){

        if (manifestCartons.includes(enteredCarton)){
            const index = manifestCartons.indexOf(enteredCarton)
            manifestCartons.splice(index, 1);
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();

            document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length;
            createManifestCartonList();

            return;
        }

        console.log(`Carton number not in list`);
        return;
    }
    console.log(`Enter a number`)
    enteredCartonNumberField.value = "";
    return;
}

function createManifestCartonList(){
    let manifestCartonList = document.getElementById("manifestCartonList");
        manifestCartonList.innerHTML=""
            for (i = 0; i < manifestCartons.length; i++){
               let li = document.createElement('li');
               li.setAttribute("id", manifestCartons[i]);
               li.innerText = manifestCartons[i];
               manifestCartonList.appendChild(li)
            }
}

function addScannedCartons(){
    event.preventDefault();
    var enteredCartonNumberField = document.getElementById("scanCartonInput");
    //Get only the last six characters of the carton number entered
    let enteredCarton = enteredCartonNumberField.value.slice(-6);
    
    //Check if entered value is number.
    if (enteredCarton.match(/^[0-9]+$/)){

        //Check if entered value has already been entered. 
        //If so, display error, clear input field and focus cursor for new input.
        if (scannedCartons.includes(enteredCarton)){
            console.log(`Carton already entered`)
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            return;
        }

        if (manifestCartons.includes(enteredCarton)){
            scannedCartons.push(enteredCarton);
        // console.log(`Scanned: ${enteredCarton}`);
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            console.log(scannedCartons);
            document.getElementById(enteredCarton).style.background="#59ee56";
            document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length
        }

        console.log(`Carton not included in manifest`)


        return;
    }
    //If entered value isn't a number, display error and clear input field
    console.log(`Enter a number`)
    enteredCartonNumberField.value = "";
    return;
}