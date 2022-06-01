function calculateCost() {
    
    var solarPanelCompany = get("solar_panel_company").value;
    var solarPanelRating = get("solar_panel_power_rating").value;
    var solarPanelUnit = get("solar_panel_unit").value;
    var solarBatteryCompany = get("solar_battery_company").value;
    var solarBatteryRating = get("solar_battery_rating").value;
    var solarBatteryUnit = get("solar_battery_unit").value;
    var solarInverterCompany = get("solar_inverter_company").value;
    var solarInverterRating = get("solar_inverter_rating").value;

    var solarPanelCost = 0;
    var solarBatteryCost = 0;
    var solarInverterCost = 0;
    var totalCost = 0;

    if (
        solarPanelUnit.toString().length == 0 || solarBatteryUnit.toString().length == 0) {
        window.alert("Unit field can't be empty");
        return;
    }

    if (solarPanelCompany == "Vikram") {
        if (solarPanelRating == 160) {
            solarPanelCost += 5000 
        } else if (solarPanelRating == 200) {
            solarPanelCost += 5600
        } else if (solarPanelRating == 250) {
            solarPanelCost += 7200
        }
    } else if(solarPanelCompany == "Geo Power") {
        if (solarPanelRating == 160) {
            solarPanelCost += 8700 
        } else if (solarPanelRating == 200) {
            solarPanelCost += 9600
        } else if (solarPanelRating == 250) {
            solarPanelCost += 10000
        }
    } else if(solarPanelCompany == "Solar India") {
        if (solarPanelRating == 160) {
            solarPanelCost += 6770
        } else if (solarPanelRating == 200) {
            solarPanelCost += 9000
        } else if (solarPanelRating == 250) {
            solarPanelCost += 11800
        }
    }

    if (solarBatteryCompany == "Loom Solar") {
        if (solarBatteryRating == 100) {
            solarBatteryCost += 15000
        } else if(solarBatteryRating == 200) {
            solarBatteryCost += 30000
        } else if(solarBatteryRating == 300) {
            solarBatteryCost += 45000
        }
    } else if(solarBatteryCompany == "Okaya") {
        if (solarBatteryRating == 100) {
            solarBatteryCost += 10000
        } else if(solarBatteryRating == 200) {
            solarBatteryCost += 20000
        } else if(solarBatteryRating == 300) {
            solarBatteryCost += 30000
        }
    } else if(solarBatteryCompany == "Amaron") {
        if (solarBatteryRating == 100) {
            solarBatteryCost += 12000
        } else if(solarBatteryRating == 200) {
            solarBatteryCost += 24000
        } else if(solarBatteryRating == 300) {
            solarBatteryCost += 36000
        }
    }

    if (solarInverterCompany == "Loom Solar") {
        if (solarInverterRating == 3) {
            solarInverterCost += 47500
        } else if (solarInverterRating == 5) {
            solarInverterCost += 65000
        } else if(solarInverterRating == 7.5) {
            solarInverterCost += 85000
        }
    } else if(solarInverterCompany == "Luminous") {
        if (solarInverterRating == 3) {
            solarInverterCost += 55500
        } else if (solarInverterRating == 5) {
            solarInverterCost += 78000
        } else if(solarInverterRating == 7.5) {
            solarInverterCost += 96500
        }
    } else if(solarInverterCompany == "Microtek") {
        if (solarInverterRating == 3) {
            solarInverterCost += 40335
        } else if (solarInverterRating == 5) {
            solarInverterCost += 60000
        } else if(solarInverterRating == 7.5) {
            solarInverterCost += 76789
        }
    }  

    solarPanelCost *= solarPanelUnit;
    solarBatteryCost *= solarBatteryUnit;

    totalCost = solarPanelCost + solarBatteryCost + solarInverterCost;

    get("total_cost").innerHTML = "Rs. " + totalCost + " + other component cost (see important note). ";
}

function get(id) {
    return document.getElementById(id.toString())
}

function togglePopup(){
   document.getElementById("popup-1").classList.toggle("active"); 
}