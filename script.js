const category = document.getElementById("category");
const valueInput = document.getElementById("value");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");

const units = {
    length: {
        meter: 1,
        kilometer: 1000,
        foot: 0.3048,
        mile: 1609.344
    },
    weight: {
        kilogram: 1,
        gram: 0.001,
        pound: 0.45359237,
        ounce: 0.0283495231
    }
};

const unitNames = {
    meter: "Meter",
    kilometer: "Kilometer",
    foot: "Foot",
    mile: "Mile",
    kilogram: "Kilogram",
    gram: "Gram",
    pound: "Pound",
    ounce: "Ounce"
};

function loadUnits() {
    const selectedCategory = category.value;
    const availableUnits = units[selectedCategory];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    Object.keys(availableUnits).forEach(unit => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = unit;
        option2.value = unit;

        option1.textContent = unitNames[unit];
        option2.textContent = unitNames[unit];

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    });

    if (selectedCategory === "length") {
        toUnit.value = "foot";
    } else {
        toUnit.value = "pound";
    }

    convert();
}

function convert() {
    const value = parseFloat(valueInput.value);

    if (isNaN(value)) {
        result.textContent = "0";
        return;
    }

    const selectedCategory = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    const baseValue = value * units[selectedCategory][from];
    const convertedValue = baseValue / units[selectedCategory][to];

    result.textContent = `${convertedValue.toFixed(4)} ${unitNames[to]}`;
}

category.addEventListener("change", loadUnits);
valueInput.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

loadUnits();