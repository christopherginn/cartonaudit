let manifestCartons = []
let scannedCartons = []
let expectedCartons = []
let unexpectedCartons = []
let cartonsOnOthManifests = []
let cartonsScannedOnOthShip = []
let shipmentObj;
let shipmentList = [];

const params = new URL(location.href).searchParams;
const shipmentNum = params.get('shipment');

var unexpectCarton_beep = new Audio("./start-13691.mp3");

window.onload = function(){
   let shipmentNumEl = document.getElementById("shipmentNum");
   let shipmentDateEl = document.getElementById("shipmentDate");
   
    // el.innerText = `Shipment: ${shipmentNum}`;

   shipmentObj = JSON.parse(localStorage.getItem(shipmentNum));
   shipmentNumEl.innerText = `Shipment: ${shipmentObj.shipmentId}`
   shipmentDateEl.innerText = `Shipment Date: ${shipmentObj.shipmentDate}`;

   manifestCartons = shipmentObj.manifestCartons;
   scannedCartons = shipmentObj.scannedCartons;
   expectedCartons = shipmentObj.expectedCartons;
   unexpectedCartons = shipmentObj.unexpectedCartons;
   cartonsOnOthManifests = shipmentObj.cartonsOnOthManifests;
   cartonsScannedOnOthShip = shipmentObj.cartonsScannedOnOthShip;

   console.log(expectedCartons)

   document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length
    createManifestCartonList();
    document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length;

    if (expectedCartons.length !== null){
        for (i=0; i < expectedCartons.length; i++){
            document.getElementById(expectedCartons[i]).style.background="#59ee56";
        }
    }
    
    document.getElementById("expectedCartonCount").innerHTML=expectedCartons.length;

    document.getElementById("unexpectedCartonCount").innerHTML=unexpectedCartons.length;
    createUnexpectedCartonList();

    // for (i=0; i<shipmentList.length; i++){
    //     let shipment = JSON.parse(localStorage.getItem(shipmentList[i]));
    //     if (shipment !== null){
    //         if (shipment.manifestCartons !== null){
    //             if (shipment.manifestCartons.includes(enteredCarton)) {
    //                 // document.getElementById(enteredCarton).style.background="D86C54";
    //                 // console.log(`Yes ${enteredCarton} is in ${shipment.shipmentId}`)
    //                 document.getElementById(enteredCarton).innerHTML=`${enteredCarton} is in ${shipment.shipmentId}`
    //             }
    //         }
    //     }

    shipmentList = JSON.parse(localStorage.getItem("shipmentList"));
    // console.log(shipmentList)
}

// function getSavedData(){
//     if (localStorage.getItem("manifestCartons") != null) {
//         manifestCartons = JSON.parse(localStorage.getItem("manifestCartons"))
//         // console.log(manifestCartons.length)
//         document.getElementById("manifestCartonCount").innerHTML=manifestCartons.length
//         createManifestCartonList();

//         if (localStorage.getItem("scannedCartons") != null) {
//             scannedCartons = JSON.parse(localStorage.getItem("scannedCartons"));
//             document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length;
            
// //             expectedCartons = JSON.parse(localStorage.getItem("expectedCartons"));
//             for (i=0; i < expectedCartons.length; i++){
//                 document.getElementById(expectedCartons[i]).style.background="#59ee56";
//             }
//             document.getElementById("expectedCartonCount").innerHTML=expectedCartons.length;

// //             unexpectedCartons = JSON.parse(localStorage.getItem("unexpectedCartons"));
//             document.getElementById("unexpectedCartonCount").innerHTML=unexpectedCartons.length;
//             createUnexpectedCartonList();
// //         }
// //     }
// //     // alert("No data saved.")
// // }

// // function clearSavedData(){
// //     localStorage.clear();
// //     location.reload();
// //     alert("Saved data cleared.")
// }

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

        // localStorage.setItem("manifestCartons", JSON.stringify(manifestCartons));
        console.log(shipmentObj.manifestCartons)
        console.log(shipmentObj)

        localStorage.setItem(shipmentNum, JSON.stringify(shipmentObj))

        return;
    }
    //If entered value isn't a number, display error and clear input field
    alert(`Carton numbers are not alphanumeric.`)
    enteredCartonNumberField.value = "";
    return;
}

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
        // localStorage.setItem("scannedCartons", JSON.stringify(scannedCartons));
        localStorage.setItem(shipmentNum, JSON.stringify(shipmentObj));

        document.getElementById("scannedCartonCount").innerHTML=scannedCartons.length

        if (manifestCartons.includes(enteredCarton)){
            expectedCartons.push(enteredCarton);
            localStorage.setItem(shipmentNum, JSON.stringify(shipmentObj));
        // console.log(`Scanned: ${enteredCarton}`);
            enteredCartonNumberField.value = "";
            enteredCartonNumberField.focus();
            // console.log(scannedCartons);
            document.getElementById(enteredCarton).style.background="#59ee56";
            document.getElementById("expectedCartonCount").innerHTML=expectedCartons.length;
            return;
        }

        

        

        unexpectedCartons.push(enteredCarton);
        localStorage.setItem(shipmentNum, JSON.stringify(shipmentObj));
        unexpectCarton_beep.play();
        enteredCartonNumberField.value = "";
        enteredCartonNumberField.focus();
        document.getElementById("unexpectedCartonCount").innerHTML=unexpectedCartons.length;

        createUnexpectedCartonList();
        // console.log(`Carton not included in manifest`)

        for (i=0; i<shipmentList.length; i++){
            let shipment = JSON.parse(localStorage.getItem(shipmentList[i]));
            if (shipment !== null){
                if (shipment.manifestCartons !== null){
                    if (shipment.manifestCartons.includes(enteredCarton)) {
                        // document.getElementById(enteredCarton).style.background="D86C54";
                        // console.log(`Yes ${enteredCarton} is in ${shipment.shipmentId}`)
                        document.getElementById(enteredCarton).innerHTML=`${enteredCarton} is in ${shipment.shipmentId}`
                        cartonsOnOthManifests.push(enteredCarton);
                    }
                }
            }

                
                
            
        };


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
                li.setAttribute("id", unexpectedCartons[i]);
                li.innerText = unexpectedCartons[i];
                unexpectedCartonList.appendChild(li)
                }
}