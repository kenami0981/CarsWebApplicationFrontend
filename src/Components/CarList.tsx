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
        <div>
            <h1>Car List</h1>
            <ul>
                {cars.map(car =>(
                    <li key={car.id}>
                        <Link to={`/cars/${car.id}`}>
                            <h2>{car.brand} {car.model}</h2>
                        </Link>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}
