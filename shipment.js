function addShipment() {
    event.preventDefault();

    let enteredShipmentNum = document.getElementById("shipmentNumber").value;
    let enteredShipmentDate = document.getElementById("shipmentDate").value;

    if (enteredShipmentNum.match(/^[0-9]+$/)){
        console.log(`Valid number`);
        console.log(`${enteredShipmentDate}`);

        if (localStorage.getItem(enteredShipmentNum) == null){
            var shipmentObj = {
                                shipmentId: enteredShipmentNum,
                                shipmentDate: enteredShipmentDate,
                                manifestCartons: [],
                                scannedCartons: []
                                };

            localStorage.setItem(enteredShipmentNum, JSON.stringify(shipmentObj));
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
    console.log(document.getElementById("shipmentListNum").value)
}