

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
        printTotals();
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
        calculateRecommended();
        printTotals();
      });
      numElevatorsInput.addEventListener("keyup", (e) => {
        values.elevators = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
    
      numApartmentsInput.addEventListener("change", (e) => {
        values.apartments = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
      numApartmentsInput.addEventListener("keyup", (e) => {
        values.apartments = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
    
      numFloorsInput.addEventListener("change", (e) => {
        values.floors = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
      numFloorsInput.addEventListener("keyup", (e) => {
        values.floors = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
    
      numOccupantsPerFloorInput.addEventListener("change", (e) => {
        values.occupants = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
      numOccupantsPerFloorInput.addEventListener("keyup", (e) => {
        values.occupants = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
    
      numBasementsInput.addEventListener("change", (e) => {
        values.basements = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
      numBasementsInput.addEventListener("keyup", (e) => {
        values.basements = Number(e.target.value);
        e.stopImmediatePropagation();
        calculateRecommended();
        printTotals();
      });
    }
    
    //window.onload = function() {
    // alert("Please choose your Building Type + Elevator Type, for others only enter positive number");
    // return;
    //  }
    function calculateRecommended() {
      // COMMERCIAL
      if (selectedBuildingType === "commercial") {
        values.recommended = values.elevators;
        recommendedElevatorsInput.value = values.recommended;
      }
    
      // RESIDENTIAL
      if (selectedBuildingType === "residential") {
        if (values.apartments <= 0 || values.floors <= 0) return;
    
        let doorsPerFloor = Math.ceil(values.apartments / values.floors);
        let elevatorShaftsNeeded = Math.ceil(doorsPerFloor / 6); //<== require an elevator shaft for every 6 apartments
        let columnsRequired = Math.ceil(values.floors / 20); //<== every 20 floors requires an additional column
        values.recommended = columnsRequired * elevatorShaftsNeeded;
        recommendedElevatorsInput.value = values.recommended;
      }
      
      // CORPORATE/HYBRID
      if (selectedBuildingType === "corporate" || selectedBuildingType === "hybrid") {
        if (values.floors <= 0 || values.basements <= 0 || values.occupants <= 0) return;
    
        let totalOccupants = values.occupants * (values.floors + values.basements);
        let elevatorShaftsNeeded = Math.ceil(totalOccupants / 1000);
        let columnsRequired = Math.ceil((values.floors + values.basements) / 20); //<== every 20 floors requires an additional column
        let elevatorsPerColumn = Math.ceil(elevatorShaftsNeeded / columnsRequired);
        values.recommended = columnsRequired * elevatorsPerColumn;
        recommendedElevatorsInput.value = values.recommended;
      }
    }
    
    function formatPrice(amount) {
      return `$${Number(amount).toLocaleString()}`;
    }

    $(document).ready(function(){
      $("button").click(function(){
        $.ajax({url: "NodeRequest.js", dataType: "script"});
      });
    });

    
    module.exports = {recommended, unitCost, installationCost}
    
