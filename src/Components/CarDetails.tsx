import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../API/axios";
import { BodyTypeMap, Car, FuelTypeMap } from "../Models/Car";
import "../Styles/CarDetails.css"

export default function CarDetails() {


    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Car>>({});


    useEffect(() => {
  const fetchCar = async () => {
    try {
      setLoading(true);
      const res = await api.get<Car>(`/cars/${id}`);
      setCar(res.data);
      setFormData({
        brand: res.data.brand,
        model: res.data.model,
        doorsNumber: res.data.doorsNumber,
        luggageCapacity: res.data.luggageCapacity,
        engineCapacity: res.data.engineCapacity,
        fuelType: res.data.fuelType,
        productionDate: res.data.productionDate,
        carFuelConsumption: res.data.carFuelConsumption,
        bodyType: res.data.bodyType
      });
    } catch {
      setError("Error loading car details");
    } finally {
      setLoading(false);
    }
  };

  fetchCar();
}, [id]);


    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            await api.delete(`/cars/${id}`);
            navigate("/cars");
        } catch {
            alert("Failed to delete car");
        }
    };

    const numberFields = [
  "doorsNumber",
  "luggageCapacity",
  "engineCapacity",
  "carFuelConsumption"
];

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]:
        name === "fuelType" || name === "bodyType" || numberFields.includes(name)
            ? Number(value)
            : value
    }));
    };


    const handleSave = async () => {
        

        try {
            await api.put(`/cars/${id}`, formData);
            alert("Car updated!");
            setCar(formData as unknown as Car);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update car");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!car) return <p>Car not found</p>;

    return (
        <div>
            <h1 className="title">CAR DETAILS</h1>

            {!isEditing ? (
                <>
                
                    <div className="car-details-card">
    <h1 className="details-title">
        {car.brand} {car.model}
    </h1>

    <div className="details-grid">
        <p><span>Doors:</span> {car.doorsNumber}</p>
        <p><span>Luggage Capacity:</span> {car.luggageCapacity}</p>
        <p><span>Engine Capacity:</span> {car.engineCapacity}</p>
        <p><span>Fuel Type:</span> {FuelTypeMap[parseInt(car.fuelType)]}</p>
        <p><span>Production Date:</span> {new Date(car.productionDate).toLocaleDateString()}</p>
        <p><span>Fuel Consumption:</span> {car.carFuelConsumption}</p>
        <p><span>Body Type:</span> {BodyTypeMap[parseInt(car.bodyType)]}</p>
    </div>

    <div className="details-buttons">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit
        </button>

        <button className="btn-delete" onClick={handleDelete}>
            Delete
        </button>
    </div>
</div>
                </>
            ) : (
                <>
                <div className="editcar-container">
                    <h2>Edit Car</h2>
<div className="editcar-form">
                    <label>Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand || ""}
                        onChange={handleChange}
                    />

                    <label>Model:</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model || ""}
                        onChange={handleChange}
                    />

                    <label>Doors:</label>
                    <input
                        type="number"
                        name="doorsNumber"
                        value={formData.doorsNumber || 0}
                        onChange={handleChange}
                    />

                    <label>Luggage Capacity:</label>
                    <input
                        type="number"
                        name="luggageCapacity"
                        value={formData.luggageCapacity || 0}
                        onChange={handleChange}
                    />

                    <label>Engine Capacity:</label>
                    <input
                        type="number"
                        name="engineCapacity"
                        value={formData.engineCapacity || 0}
                        onChange={handleChange}
                    />

                    <label>Fuel Type:</label>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                    >
                        <option value={1}>Petrol</option>
                        <option value={2}>Hybrid</option>
                        <option value={3}>Diesel</option>
                        <option value={4}>LPG</option>
                    </select>

                    <label>Production Date:</label>
                    <input
                        type="date"
                        name="productionDate"
                        value={String(formData.productionDate).substring(0, 10)}
                        onChange={handleChange}
                    />

                    <label>Fuel Consumption:</label>
                    <input
                        type="number"
                        name="carFuelConsumption"
                        value={formData.carFuelConsumption || 0}
                        onChange={handleChange}
                    />

                    <label>Body Type:</label>
                    <select
                        name="bodyType"
                        value={formData.bodyType}
                        onChange={handleChange}
                    >
                        <option value={1}>Hatchback</option>
                        <option value={2}>Sedan</option>
                        <option value={3}>Kombi</option>
                        <option value={4}>SUV</option>
                        <option value={5}>Roadster</option>
                    </select>

                    <br /><br />
                    
        <button className="primary-btn" onClick={handleSave}>Save</button>
        <button className="back-btn" onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
    </div>
                </>
            )}

            <br /><br />
            <Link to="/cars" className="back-link">
                Back to Car List
            </Link>

        </div>
    );
}
