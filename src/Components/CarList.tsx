import { useEffect, useState } from "react";
import "../Styles/CarList.css";
import { Car, FuelTypeMap } from "../Models/Car";
import { Link } from "react-router-dom";
import api from "../API/axios";
export default function CarList() {
    
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await api.get<Car[]>("/cars");
      setCars(response.data);
    } catch {
      setError("Error fetching cars");
    } finally {
      setLoading(false);
    }
  };

  fetchCars();
}, []);

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
