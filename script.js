// console.log("hello")

let manifestCartons = []

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
        let manifestCartonList = document.getElementById("manifestCartonList");
        manifestCartonList.innerHTML=""
            for (i = 0; i < manifestCartons.length; i++){
               let li = document.createElement('li');
               li.innerText = manifestCartons[i];
               manifestCartonList.appendChild(li)
            }

        return;
    }
    //If entered value isn't a number, display error and clear input field
    console.log(`Enter a number`)
    enteredCartonNumberField.value = "";
    return;
}