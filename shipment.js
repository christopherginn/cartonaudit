window.onload = function(){
    let shipmentDropdownList = document.getElementById("shipmentListNum");
    let currentShipmentList = JSON.parse(localStorage.getItem("shipmentList"));

    shipmentDropdownList.innerHTML="";
            let placeholderOption = document.createElement('option');
            placeholderOption.setAttribute("selected", "selected")
            placeholderOption.setAttribute("disabled", "disabled");
            placeholderOption.innerText="Select Shipment";
            shipmentDropdownList.appendChild(placeholderOption);
            
            for (i=0; i<currentShipmentList.length; i++){
                let option = document.createElement('option');
                option.innerText = currentShipmentList[i];
                shipmentDropdownList.appendChild(option);
}
};

function addShipment() {
    event.preventDefault();

    let enteredShipmentNum = document.getElementById("shipmentNumber").value;
    let enteredShipmentDate = document.getElementById("shipmentDate").value;

    if (enteredShipmentNum.match(/^[0-9]+$/)){
        console.log(`Valid number`);
        if (enteredShipmentDate === ""){
            console.log(`Must have a date`)
            return}
        console.log(`${enteredShipmentDate}`);

        if (localStorage.getItem(enteredShipmentNum) == null){
            var shipmentObj = {
                                shipmentId: enteredShipmentNum,
                                shipmentDate: enteredShipmentDate,
                                manifestCartons: [],
                                scannedCartons: [],
                                expectedCartons: [],
                                unexpectedCartons: [],
                                cartonsOnOthManifests: [],
                                cartonsScannedOnOthShip: []
                                };

            localStorage.setItem(enteredShipmentNum, JSON.stringify(shipmentObj));
            
            if (localStorage.getItem("shipmentList") == null) {
                localStorage.setItem("shipmentList", JSON.stringify([enteredShipmentNum]));
            } else {
                let updatedShipmentList = JSON.parse(localStorage.getItem("shipmentList"));
                updatedShipmentList.push(enteredShipmentNum);
                localStorage.setItem("shipmentList", JSON.stringify(updatedShipmentList));
            };

            let shipmentDropdownList = document.getElementById("shipmentListNum");
            let currentShipmentList = JSON.parse(localStorage.getItem("shipmentList"));
            
            shipmentDropdownList.innerHTML="";
            let placeholderOption = document.createElement('option');
            placeholderOption.setAttribute("disabled", "disabled");
            placeholderOption.innerText="Select Shipment";
            shipmentDropdownList.appendChild(placeholderOption);
            
            for (i=0; i<currentShipmentList.length; i++){
                let option = document.createElement('option');
                option.innerText = currentShipmentList[i];
                shipmentDropdownList.appendChild(option);

            }


            console.log(`Shipment created`)
            return
        }

        console.log(`Shipment already exists.`)
        return
    }

    console.log(`invalid`)

    // console.log(enteredShipmentNum)
    // console.log(typeof(enteredShipmentNum))
}

function shipmentListSelect(){
    let shipment = document.getElementById("shipmentListNum").value
    console.log(shipment)
    window.location.href = `./carton_scan.html?shipment=${shipment}`;
};