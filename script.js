let manifestCartons = []
let scannedCartons = []
let expectedCartons = []
let unexpectedCartons = []

var unexpectCarton_beep = new Audio("./start-13691.mp3");

function getSavedData(){
    if (localStorage.getItem("manifestCartons") != null) {
        manifestCartons = JSON.parse(localStorage.getItem("manifestCartons"))
        // console.log(manifestCartons.length)
        document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length
        createManifestCartonList();

        if (localStorage.getItem("scannedCartons") != null) {
            scannedCartons = JSON.parse(localStorage.getItem("scannedCartons"));
            document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length;
            
            expectedCartons = JSON.parse(localStorage.getItem("expectedCartons"));
            for (i=0; i < expectedCartons.length; i++){
                document.getElementById(expectedCartons[i]).style.background="#59ee56";
            }
            document.getElementById("expectedCartonCount").innerHTML=expectedCartons.length;

            unexpectedCartons = JSON.parse(localStorage.getItem("unexpectedCartons"));
            document.getElementById("unexpectedCartonCount").innerHTML=unexpectedCartons.length;
            createUnexpectedCartonList();
        }
    }
    // alert("No data saved.")
}

function clearSavedData(){
    localStorage.clear();
    location.reload();
    alert("Saved data cleared.")
}

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
            alert(`Carton already entered`)
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            return;
        }

        manifestCartons.push(enteredCarton);
        // console.log(`Scanned: ${enteredCarton}`);
        enteredCartonNumberField.value = "";
        enteredCartonNumberField.focus();
        // console.log(manifestCartons);
        //Set manifest carton counter
        document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length

        //Create visible list of cartons on manifest
        createManifestCartonList();

        localStorage.setItem("manifestCartons", JSON.stringify(manifestCartons));

        return;
    }
    //If entered value isn't a number, display error and clear input field
    alert(`Carton numbers are not alphanumeric.`)
    enteredCartonNumberField.value = "";
    return;
}

//Bulk add
function cartonEntry(){
    const multiInput = document.getElementById("multicartonentry_textarea")
    const multiInputSubmit = document.getElementById("multicartonentry_submit")
    event.preventDefault();

    const input = multiInput.value;
    const inputSplit = input.split("\n");

    let cartonListFiltered = []

    for (i = 0; i < inputSplit.length; i++){
        if (inputSplit[i].includes("PACIFIC MARKET INTER")){
            // cartonListFiltered.push(inputSplit[i])
            const lineSplit = inputSplit[i].split(" ");

            // let lineSplitFilter = {cartonNum:lineSplit[1], styleNum:lineSplit[5], styleDesc:lineSplit[6], price:lineSplit[7], quantity:lineSplit[8]}
    
            // cartonListFiltered.push(lineSplitFilter)

            manifestCartons.push(lineSplit[1])
        }
    }

    createManifestCartonList();

    localStorage.setItem("manifestCartons", JSON.stringify(manifestCartons));
    // console.log(cartonListFiltered)
}
//End bulk add

function removeCartonNumber(){
    event.preventDefault();
    var enteredCartonNumberField = document.getElementById("cartonNumber");
    let enteredCarton = enteredCartonNumberField.value.slice(-6);
    if (manifestCartons.length==0){
        alert(`No cartons in list to remove.`);
        return;
    }
    if (enteredCarton.match(/^[0-9]+$/)){

        if (manifestCartons.includes(enteredCarton)){
            const index = manifestCartons.indexOf(enteredCarton)
            manifestCartons.splice(index, 1);
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();

            document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length;

            localStorage.removeItem("manifestCartons");
            localStorage.setItem("manifestCartons", JSON.stringify(manifestCartons));

            createManifestCartonList();

            return;
        }

        alert(`Carton number not valid.`);
        return;
    }
    alert(`Carton numbers are not alphanumeric.`)
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
            unexpectCarton_beep.play();
            alert(`Carton already entered`)
            
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            return;
        }
        scannedCartons.push(enteredCarton);
        localStorage.setItem("scannedCartons", JSON.stringify(scannedCartons));

        document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length

        if (manifestCartons.includes(enteredCarton)){
            expectedCartons.push(enteredCarton);
            localStorage.setItem("expectedCartons", JSON.stringify(expectedCartons));
        // console.log(`Scanned: ${enteredCarton}`);
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            // console.log(scannedCartons);
            document.getElementById(enteredCarton).style.background="#59ee56";
            document.getElementById("expectedCartonCount").innerHTML=expectedCartons.length;
            return;
        }

        unexpectedCartons.push(enteredCarton);
        localStorage.setItem("unexpectedCartons", JSON.stringify(unexpectedCartons));
        unexpectCarton_beep.play();
        enteredCartonNumberField.value = "";
        enteredCartonNumberField.focus();
        document.getElementById("unexpectedCartonCount").innerHTML=unexpectedCartons.length;

        createUnexpectedCartonList();
        // console.log(`Carton not included in manifest`)


        return;
    }
    //If entered value isn't a number, display error and clear input field
    alert(`Enter a valid carton number.`)
    enteredCartonNumberField.value = "";
    return;
}

function createUnexpectedCartonList(){
    let unexpectedCartonList = document.getElementById("unexpectedCartonList");
             unexpectedCartonList.innerHTML=""
                for (i = 0; i < unexpectedCartons.length; i++){
                let li = document.createElement('li');
                // li.setAttribute("id", unexpectedCartons[i]);
                li.innerText = unexpectedCartons[i];
                unexpectedCartonList.appendChild(li)
                }
}