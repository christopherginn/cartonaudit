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

            let lineSplitFilter = {cartonNum:lineSplit[1], styleNum:lineSplit[5], styleDesc:lineSplit[6], price:lineSplit[7], quantity:lineSplit[8]}
    
            cartonListFiltered.push(lineSplitFilter)
        }
    }
    console.log(cartonListFiltered)
}