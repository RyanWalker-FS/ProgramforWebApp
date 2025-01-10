import "./style.scss"; // Importing styles
import carData from "./data.json"; // Importing the car dataset

// Custom error classes
class InvalidInputTypeError extends Error {}
class InvalidInputValueError extends Error {}

// DOM elements
const yearDropdown = document.getElementById("year");
const makeDropdown = document.getElementById("make");
const modelDropdown = document.getElementById("model");

// Initially disable dropdowns
makeDropdown.disabled = true;
modelDropdown.disabled = true;

// Load the Year dropdown
function loadYearDropdown() {
	try {
		const years = [...new Set(carData.map((vehicle) => vehicle.year))].sort(
			(a, b) => a - b
		);
		years.forEach((year) => {
			const option = document.createElement("option");
			option.value = year;
			option.textContent = year;
			yearDropdown.appendChild(option);
		});
	} catch (error) {
		console.error("Error populating the Year dropdown:", error);
	}
}

// Load the Make dropdown based on selected year
function loadMakeDropdown(selectedYear) {
	try {
		makeDropdown.innerHTML = '<option value="">Select Make</option>'; // Reset options

		// Filter data based on the selected year
		const filteredData = carData.filter(
			(vehicle) => vehicle.year === parseInt(selectedYear, 10)
		);

		// Extract unique manufacturers (previously labeled as "make")
		const makes = [
			...new Set(filteredData.map((vehicle) => vehicle.Manufacturer)),
		].sort();

		// Populate the Make dropdown
		makes.forEach((make) => {
			const option = document.createElement("option");
			option.value = make;
			option.textContent = make;
			makeDropdown.appendChild(option);
		});
	} catch (error) {
		console.error("Error populating the Make dropdown:", error);
	}
}

// Load the Model dropdown based on selected year and make
function loadModelDropdown(selectedYear, selectedMake) {
	try {
		modelDropdown.innerHTML = '<option value="">Select Model</option>'; // Reset options
		const filteredData = carData.filter(
			(vehicle) =>
				vehicle.year === parseInt(selectedYear, 10) &&
				vehicle.Manufacturer === selectedMake
		);
		const models = [
			...new Set(filteredData.map((vehicle) => vehicle.model)),
		].sort();
		models.forEach((model) => {
			const option = document.createElement("option");
			option.value = model;
			option.textContent = model;
			modelDropdown.appendChild(option);
		});
	} catch (error) {
		console.error("Error populating the Model dropdown:", error);
	}
}

// Log vehicle details to the console
function logVehicleDetails(selectedYear, selectedMake, selectedModel) {
	try {
		const vehicle = carData.find(
			(vehicle) =>
				vehicle.year === parseInt(selectedYear, 10) &&
				vehicle.Manufacturer === selectedMake &&
				vehicle.model === selectedModel
		);

		if (!vehicle) throw new Error("Vehicle not found");

		console.log(`
            Vehicle Details:
            Year: ${vehicle.year}
            Make: ${vehicle.Manufacturer}
            Model: ${vehicle.model}
            Mileage: ${vehicle.mileage || "N/A"} miles
            Price: $${vehicle.price || "N/A"}
            Transmission: ${vehicle.transmission || "N/A"}
            Fuel Type: ${vehicle.fuelType || "N/A"}
            Tax: $${vehicle.tax || "N/A"}
            MPG: ${vehicle.mpg || "N/A"} mpg
            Engine Size: ${vehicle.engineSize || "N/A"} L
        `);
	} catch (error) {
		console.error("Error logging vehicle details:", error);
	}
}

// Event Listeners
yearDropdown.addEventListener("change", () => {
	const selectedYear = yearDropdown.value;
	if (!selectedYear) {
		makeDropdown.disabled = true;
		modelDropdown.disabled = true;
		makeDropdown.innerHTML = '<option value="">Select Make</option>';
		modelDropdown.innerHTML = '<option value="">Select Model</option>';
		return;
	}

	loadMakeDropdown(selectedYear);
	makeDropdown.disabled = false;
	modelDropdown.disabled = true;
	modelDropdown.innerHTML = '<option value="">Select Model</option>';
});

makeDropdown.addEventListener("change", () => {
	const selectedYear = yearDropdown.value;
	const selectedMake = makeDropdown.value;

	if (!selectedMake) {
		modelDropdown.disabled = true;
		modelDropdown.innerHTML = '<option value="">Select Model</option>';
		return;
	}

	loadModelDropdown(selectedYear, selectedMake);
	modelDropdown.disabled = false;
});

modelDropdown.addEventListener("change", () => {
	const selectedYear = yearDropdown.value;
	const selectedMake = makeDropdown.value;
	const selectedModel = modelDropdown.value;

	if (!selectedModel) {
		return;
	}

	logVehicleDetails(selectedYear, selectedMake, selectedModel);
});

// Initialize the app
loadYearDropdown();
