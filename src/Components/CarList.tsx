import { useEffect, useState } from "react";
import "../Styles/CarList.css";
import { Car } from "../Models/Car";
import axios from 'axios';
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
        <div><p>działa</p></div>
    )
}
