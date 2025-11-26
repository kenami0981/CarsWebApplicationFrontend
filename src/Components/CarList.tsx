import { useEffect, useState } from "react";
import "../Styles/CarList.css";
import { Car, FuelTypeMap } from "../Models/Car";
import axios from 'axios';
import { Link } from "react-router-dom";
export default function CarList() {
    
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get<Car[]>('https://localhost:7290/api/cars/').then((response) => {
            setCars(response.data);
        })
        .catch(() => {
            setError('Error fetching cars');
        })
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    },[]);
    if (loading) return <p>Loading cars...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="car-list-wrapper">
            <h1 className="car-list-title">Car List</h1>

            <ul className="car-list">
                {cars.map(car => (
                    <li key={car.id} className="car-card">
                        <Link to={`/cars/${car.id}`} className="car-link">
                            <h2>{car.brand} {car.model}</h2>
                            <span className="car-arrow">→</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
