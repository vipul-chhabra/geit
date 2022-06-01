function calculate() {

    var table = document.getElementById("data_table");
    var rowCount = table.rows.length - 1;

    var totalAcLoad = 0;
    var totalEnergyConsumption = 0;

    for (let i = 1; i < rowCount; i++) {
        totalAcLoad += parseFloat(document.getElementById("total_ac_load" + i).innerHTML);
        totalEnergyConsumption += parseFloat(document.getElementById("total_energy_consumption" + i).innerHTML);  
    }

    //Inverter Rating
    var totalPower = totalAcLoad + (totalAcLoad * 0.25);
    var powerFactor = 0.8;
    var inverterRating = totalPower / (powerFactor * 1000);
    document.getElementById("inverter_rating").innerHTML = inverterRating;

    //Energy Required from Battery

    var lossInInverter = 20 
    var energyRequiredFromBattery = (totalEnergyConsumption / 1000) + ((lossInInverter * totalEnergyConsumption)/100000);
    document.getElementById("battery_energy").innerHTML = energyRequiredFromBattery;

    //Battery Storage

    var depthOfDischarge = 50
    var batteryStorage = (energyRequiredFromBattery * 100) / depthOfDischarge;
    document.getElementById("battery_storage").innerHTML = batteryStorage

    //Single Battery Rating

    var voltageRating = 12
    var ampereHourRating = 200
    var singleBatteryRating = voltageRating * ampereHourRating / 1000;
    document.getElementById("single_battery_rating").innerHTML = singleBatteryRating

    //Battery Units

    var batteryUnits = batteryStorage / singleBatteryRating;
    document.getElementById("battery_units").innerHTML = batteryUnits;

    //Input Energy to Battery Unit

    var lossInBatteries = 15
    var inputEnergyToBatteryUnit = energyRequiredFromBattery + (lossInBatteries * energyRequiredFromBattery / 100);
    document.getElementById("input_energy_to_battery_unit").innerHTML = inputEnergyToBatteryUnit;

    //Energy Required from panel

    var internalLossInControllerAndInverter = 4
    var energyRequiredFromPanel = inputEnergyToBatteryUnit + (internalLossInControllerAndInverter * inputEnergyToBatteryUnit / 100);
    document.getElementById("energy_required_from_panel").innerHTML = energyRequiredFromPanel;

    //Total Energy from panel 

    var internalLossInPanel = 25
    var totalEnergyFromPanel = energyRequiredFromPanel + (internalLossInPanel * energyRequiredFromPanel / 100);
    document.getElementById("total_energy_from_panel").innerHTML = totalEnergyFromPanel;

    //Power rating of solar panel

    var hoursOfSolarRadiation = 5.5
    var powerRatingOfSolarPanel = totalEnergyFromPanel / hoursOfSolarRadiation;
    document.getElementById("power_rating_of_solar_panel").innerHTML = powerRatingOfSolarPanel;

    //Number of panel

    var powerRatingOfEachPanelInWatt = 250
    var numberOfPanel = Math.ceil((powerRatingOfSolarPanel * 1000)/powerRatingOfEachPanelInWatt);
    document.getElementById("no_of_panel").innerHTML = numberOfPanel;

    //Area required

    var solarIrradiation = 1000
    var conversionEfficiency = 25
    var areaRequired = (numberOfPanel * powerRatingOfEachPanelInWatt) / (solarIrradiation * conversionEfficiency / 100);
    document.getElementById("area_required").innerHTML = areaRequired;
}

function addRow() {

    var applianceName = document.getElementById("appliance_name").value;
    var powerRating = document.getElementById("power_rating").value;
    var unit = document.getElementById("unit").value;
    var dailyUsage = document.getElementById("daily_usage").value;

    if (applianceName.length == 0 || powerRating.length == 0 || unit.length == 0 || dailyUsage.length == 0) {
        return;
    }

    var totalAcLoad = parseFloat(powerRating) * parseFloat(unit);
    var totalEnergyConsumption = totalAcLoad * parseFloat(dailyUsage);

    var table = document.getElementById("data_table");
    var rowCount = (table.rows.length) - 1;

    console.log(rowCount)
    table.insertRow(rowCount).outerHTML = "<tr id='row" + rowCount + "'><td id='appliance_name" + rowCount + "'>" + applianceName + "</td><td id='power_rating" + rowCount + "'>" + powerRating + "</td><td id='unit" + rowCount + "'>" + unit + "</td><td id='daily_usage" + rowCount + "'>" + dailyUsage + "</td><td id='total_ac_load" + rowCount + "'>" + totalAcLoad + "</td><td id='total_energy_consumption" + rowCount + "'>" + totalEnergyConsumption + "</td><td><input type='button' id='edit_button" + rowCount + "' value='Edit' class='edit' onclick='editRow(" + rowCount + ")'> <input type='button' id='save_button" + rowCount + "' value='Save' class='save' onclick='saveRow(" + rowCount + ")'> <input type='button' value='Delete' class='delete' onclick='deleteRow(" + rowCount + ")'></td></tr>";

    document.getElementById("save_button" + rowCount).style.display = "none";

    document.getElementById("appliance_name").value = "";
    document.getElementById("power_rating").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("daily_usage").value = "";
    document.getElementById("total_ac_load").value = "";
    document.getElementById("total_energy_consumption").value = "";
    
}

function deleteRow(rowNumber) {
    document.getElementById("row" + rowNumber + "").outerHTML = "";
}

function editRow(rowNumber) {
    
    document.getElementById("edit_button" + rowNumber).style.display = "none";
    document.getElementById("save_button" + rowNumber).style.display = "block";

    var applianceName = document.getElementById("appliance_name" + rowNumber);
    var powerRating = document.getElementById("power_rating" + rowNumber);
    var unit = document.getElementById("unit" + rowNumber);
    var dailyUsage = document.getElementById("daily_usage" + rowNumber);
    var totalAcLoad = document.getElementById("total_ac_load" + rowNumber);
    var totalEnergyConsumption = document.getElementById("total_energy_consumption" + rowNumber);

    var applianceNameData = applianceName.innerHTML;
    var powerRatingData = powerRating.innerHTML;
    var unitData = unit.innerHTML;
    var dailyUsageData = dailyUsage.innerHTML;
    var totalAcLoadData = totalAcLoad.innerHTML;
    var totalEnergyConsumptionData = totalEnergyConsumption.innerHTML;

    applianceName.innerHTML = "<input type='text' id='appliance_name_text" + rowNumber + "' value='" + applianceNameData + "'>";
    powerRating.innerHTML = "<input type='number' id='power_rating_text" + rowNumber + "' value='" + powerRatingData + "'>";
    unit.innerHTML = "<input type='number' id='unit_text" + rowNumber + "' value='" + unitData + "'>";
    dailyUsage.innerHTML = "<input type='number' id='daily_usage_text" + rowNumber + "' value='" + dailyUsageData + "'>";
    totalAcLoad.innerHTML = "<p>" + totalAcLoadData + "</p>";
    totalEnergyConsumption.innerHTML = "<p>" + totalEnergyConsumptionData + "</p>";
    
}

function saveRow(rowNumber) {

    var applianceName = document.getElementById("appliance_name_text" + rowNumber).value;
    var powerRating = document.getElementById("power_rating_text" + rowNumber).value;
    var unit = document.getElementById("unit_text" + rowNumber).value;
    var dailyUsage = document.getElementById("daily_usage_text" + rowNumber).value;
    
    if (applianceName.length == 0 || powerRating.length == 0 || unit.length == 0 || dailyUsage.length == 0) {
        return;
    }

    var totalAcLoad = parseFloat(powerRating) * parseFloat(unit);
    var totalEnergyConsumption = totalAcLoad * parseFloat(dailyUsage);

    document.getElementById("appliance_name" + rowNumber).innerHTML = applianceName;
    document.getElementById("power_rating" + rowNumber).innerHTML = powerRating;
    document.getElementById("unit" + rowNumber).innerHTML = unit;
    document.getElementById("daily_usage" + rowNumber).innerHTML = dailyUsage;
    document.getElementById("total_ac_load" + rowNumber).innerHTML = totalAcLoad;
    document.getElementById("total_energy_consumption" + rowNumber).innerHTML = totalEnergyConsumption;

    document.getElementById("edit_button" + rowNumber).style.display = "block";
    document.getElementById("save_button" + rowNumber).style.display = "none";
}

function togglePopup(){
   document.getElementById("popup-1").classList.toggle("active"); 
}
