import { useEffect, useState } from "react";
import "../Styles/CarList.css";
import { Car } from "../Models/Car";
import { Link, Navigate } from "react-router-dom";
import api from "../API/axios";
import { useAuth } from "../Context/AuthContext";

export default function CarList() {
  const { user } = useAuth();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!user) return; 

    const fetchCars = async () => {
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
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
  );
}
