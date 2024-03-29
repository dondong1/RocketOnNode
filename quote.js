

    // "residential" is already checked on page load
    let selectedBuildingType = "residential";
    window.onload = () => init(selectedBuildingType);
    
    // IDs according to building type
    const selectionIDs = {
      residential: ["number-of-apartments", "number-of-floors", "number-of-basements"],
      commercial: ["number-of-floors", "number-of-basements", "number-of-companies", "number-of-parking-spots", "number-of-elevators"],
      corporate: ["number-of-floors", "number-of-basements", "number-of-parking-spots", "number-of-corporations", "maximum-occupancy"],
      hybrid: ["number-of-floors", "number-of-basements", "number-of-companies", "number-of-parking-spots", "maximum-occupancy", "business-hours"]
    };
    
    const inputs = document.querySelectorAll("input[type=number]");
    const buildingTypes = document.querySelectorAll(".building-option-list input");
    const cabGradeButtons = document.querySelectorAll("input[name=cab-grade]");
    
    const numApartmentsInput = document.getElementById("num-apartments");
    const numFloorsInput = document.getElementById("num-floors");
    const numBasementsInput = document.getElementById("num-basements");
    const numElevatorsInput = document.getElementById("num-elevators");
    const numOccupantsPerFloorInput = document.getElementById("max-occupancy");

    
    const recommendedElevatorsInput = document.getElementById("recommended");
    const costPerElevatorInput = document.getElementById("unit-price");
    const costBasedOnQuantityInput = document.getElementById("subtotal-price");
    const installationCostsInput = document.getElementById("fees-installation");
    
    let finalPaymentOutputSpan = document.getElementById("final_payment");
    
    const values = {
      apartments: 0,
      floors: 0,
      basements: 0,
      elevators: 0,
      occupants: 0,
      recommended: 0,
      unitCost: 0,
      installationCost: 0
    };
    
    // Add eventListener to each "building type" radio button
    buildingTypes.forEach((buildingType) => {
      buildingType.addEventListener("click", (e) => {
        selectedBuildingType = e.target.value;
        switchInputs(selectedBuildingType);
        init();
      });
    });
    
    cabGradeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        values.unitCost = Number(e.target.getAttribute("data-price"));
        values.installationCost = Number(e.target.getAttribute("data-fee"));
        costPerElevatorInput.value = formatPrice(values.unitCost);
        postData();
      })
    })
    
    //================================
    
    function switchInputs(selectedBuildingType) {
      inputs.forEach(input => {
        // Clear all inputs
        input.value = "";
        // Hide all input elements on page
        let formField = input.parentElement;
        formField.classList.add("d-none");
      });
    
      // Show only elements with IDs according to selection
      selectionIDs[selectedBuildingType].forEach(id => {
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].parentElement.id === id) {
            inputs[i].parentElement.classList.remove("d-none");
          }
        }
      });
    }
    
    
    function init() {
      numElevatorsInput.addEventListener("change", (e) => {
        values.elevators = Number(e.target.value);
         e.stopImmediatePropagation();
          postData();
      });
      numElevatorsInput.addEventListener("keyup", (e) => {
        values.elevators = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
    
      numApartmentsInput.addEventListener("change", (e) => {
        values.apartments = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
      numApartmentsInput.addEventListener("keyup", (e) => {
        values.apartments = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
    
      numFloorsInput.addEventListener("change", (e) => {
        values.floors = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
      numFloorsInput.addEventListener("keyup", (e) => {
        values.floors = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
    
      numOccupantsPerFloorInput.addEventListener("change", (e) => {
        values.occupants = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
      numOccupantsPerFloorInput.addEventListener("keyup", (e) => {
        values.occupants = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
    
      numBasementsInput.addEventListener("change", (e) => {
        values.basements = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
      numBasementsInput.addEventListener("keyup", (e) => {
        values.basements = Number(e.target.value);
        e.stopImmediatePropagation();
        postData();
      });
    }
  
    
    function formatPrice(amount) {
      return `$${Number(amount).toLocaleString()}`;
    }

    function setTotals() {
      let costBasedOnQuantity = values.recommended * values.unitCost;
      costBasedOnQuantityInput.value = formatPrice(costBasedOnQuantity);
      installationCostsInput.value = formatPrice(costBasedOnQuantity * values.installationCost);
      finalPaymentOutputSpan.textContent = formatPrice(costBasedOnQuantity + (costBasedOnQuantity * values.installationCost));
    }
    

    function postData() {
      fetch(
        "http://127.0.0.1:3000", {
          medthod: "POST",
          body: JSON.stringify({
            "values": values,
            "selectedBuildingType": selectedBuildingType
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }

        }).then((response) => {
          return response.json();
        }).then((data) => {
         setTotals(data);
        }).catch((err) => {
          console.log(err);
        });
    }
    
