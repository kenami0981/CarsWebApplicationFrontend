import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Car, FuelTypeMap } from "../Models/Car";

export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<Car>(`https://localhost:7290/api/cars/${id}`)
            .then(res => setCar(res.data))
            .catch(() => setError("Error loading car details"))
            .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            await axios.delete(`https://localhost:7290/api/cars/${id}`);
            navigate("/cars");
        } catch (err) {
            alert("Failed to delete car");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!car) return <p>Car not found</p>;

    return (
        <div>
            <h1>{car.brand} {car.model}</h1>

            <p>Doors: {car.doorsNumber}</p>
            <p>Luggage Capacity: {car.luggageCapacity}</p>
            <p>Engine Capacity: {car.engineCapacity}</p>
            <p>Fuel Type: {FuelTypeMap[parseInt(car.fuelType)]}</p>
            <p>Production Date: {new Date(car.productionDate).toLocaleDateString()}</p>
            <p>Fuel Consuption: {car.carFuelConsumption}</p>
            <p>Body Type: {car.bodyType}</p>

            <button onClick={handleDelete}>Delete</button>

            <br /><br />

            <Link to="/cars">← Back to Car List</Link>
        </div>
    );
}
