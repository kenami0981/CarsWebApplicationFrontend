import "./CarList.css";

export default function CarList() {
    const cars = [
        { id: 1, brand: "BMW", model: "M3", year: 2020 },
        { id: 2, brand: "Audi", model: "A4", year: 2019 },
        { id: 3, brand: "Mercedes", model: "C200", year: 2021 }
    ];

    return (
        <div className="car-list">
            <h2>Lista samochodów</h2>

            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        <span>{car.brand} {car.model}</span>
                        <span className="year">{car.year}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
