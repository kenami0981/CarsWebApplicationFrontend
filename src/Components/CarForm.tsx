import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CarForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        doorsNumber: 0,
        luggageCapacity: 0,
        engineCapacity: 0,
        fuelType: 0,
        productionDate: "",
        carFuelConsumption: 0,
        bodyType: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: name === "fuelType" || name === "bodyType"
            ? Number(value)        // konwersja string → number
            : value
    }));
};
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("https://localhost:7290/api/cars", formData);
            navigate("/cars");
        } catch (error) {
            console.error(error);
            alert("Error adding new car"+error);
        }
    };

    return (
        <div>
            <h1>Add New Car</h1>

            <form onSubmit={handleSubmit}>

                <label>Brand:</label>
                <input name="brand" value={formData.brand} onChange={handleChange} required />

                <label>Model:</label>
                <input name="model" value={formData.model} onChange={handleChange} required />

                <label>Doors Number:</label>
                <input type="number" name="doorsNumber" value={formData.doorsNumber} onChange={handleChange} required />

                <label>Luggage Capacity:</label>
                <input type="number" name="luggageCapacity" value={formData.luggageCapacity} onChange={handleChange} required />

                <label>Engine Capacity:</label>
                <input type="number" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} required />

                <label>Fuel Type:</label>
                <select
    name="fuelType"
    value={formData.fuelType}
    onChange={handleChange}
    required
>
    <option value={0}>Petrol</option>
    <option value={1}>Hybrid</option>
    <option value={2}>Diesel</option>
    <option value={3}>LPG</option>
</select>

                <label>Production Date:</label>
                <input type="date" name="productionDate" value={formData.productionDate} onChange={handleChange} required />

                <label>Fuel Consumption:</label>
                <input type="number" name="carFuelConsumption" value={formData.carFuelConsumption} onChange={handleChange} required />

                <label>Body Type:</label>
                <select
    name="bodyType"
    value={formData.bodyType}
    onChange={handleChange}
    required
>
    <option value={0}>Hatchback</option>
    <option value={1}>Sedan</option>
    <option value={2}>Kombi</option>
    <option value={3}>SUV</option>
    <option value={4}>Roadster</option>
</select>

                <button type="submit">Add Car</button>
            </form>

            <button onClick={() => navigate("/cars")}>Back</button>
        </div>
    );
}
