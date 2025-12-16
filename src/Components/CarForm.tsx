import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import { Car } from "../Models/Car";
import "../Styles/CarForm.css";

export default function CarForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<Car>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const numericFields = [
            "doorsNumber",
            "luggageCapacity",
            "engineCapacity",
            "carFuelConsumption",
            "fuelType",
            "bodyType"
        ];

        setFormData((prev) => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/cars", formData);
            navigate("/cars");
        } catch (error) {
            console.error(error);
            alert("Error adding new car: " + error);
        }
    };

    return (
        <div className="addcar-container">
            <h1>Add New Car</h1>

            <form onSubmit={handleSubmit} className="addcar-form">
                <label>Brand:</label>
                <input
                    name="brand"
                    value={formData.brand || ""}
                    onChange={handleChange}
                    required
                />

                <label>Model:</label>
                <input
                    name="model"
                    value={formData.model || ""}
                    onChange={handleChange}
                    required
                />

                <label>Doors Number:</label>
                <input
                    type="number"
                    name="doorsNumber"
                    value={formData.doorsNumber ?? ""}
                    onChange={handleChange}
                    required
                />

                <label>Luggage Capacity:</label>
                <input
                    type="number"
                    name="luggageCapacity"
                    value={formData.luggageCapacity ?? ""}
                    onChange={handleChange}
                    required
                />

                <label>Engine Capacity:</label>
                <input
                    type="number"
                    name="engineCapacity"
                    value={formData.engineCapacity ?? ""}
                    onChange={handleChange}
                    required
                />

                <label>Fuel Type:</label>
                <select
                    name="fuelType"
                    value={formData.fuelType ?? ""}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>-- select --</option>
                    <option value={1}>Petrol</option>
                    <option value={2}>Hybrid</option>
                    <option value={3}>Diesel</option>
                    <option value={4}>LPG</option>
                </select>

                <label>Production Date:</label>
                <input
                    type="date"
                    name="productionDate"
                    value={
                        formData.productionDate
                            ? String(formData.productionDate).substring(0, 10)
                            : ""
                    }
                    onChange={handleChange}
                    required
                />

                <label>Fuel Consumption:</label>
                <input
                    type="number"
                    name="carFuelConsumption"
                    value={formData.carFuelConsumption ?? ""}
                    onChange={handleChange}
                    required
                />

                <label>Body Type:</label>
                <select
                    name="bodyType"
                    value={formData.bodyType ?? ""}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>-- select --</option>
                    <option value={1}>Hatchback</option>
                    <option value={2}>Sedan</option>
                    <option value={3}>Kombi</option>
                    <option value={4}>SUV</option>
                    <option value={5}>Roadster</option>
                </select>

                <button type="submit" className="primary-btn">Add Car</button>
            </form>

            <button onClick={() => navigate("/cars")} className="back-btn">Back</button>
        </div>
    );
}
