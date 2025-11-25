export enum FuelType {
    Petrol = "Petrol",
    Hybrid = "Hybrid",
    Diesel = "Diesel",
    LPG = "LPG"
}

export enum BodyType {
    Hatchback = "Hatchback",
    Sedan = "Sedan",
    Kombi = "Kombi",
    SUV = "SUV",
    Roadster = "Roadster"
}
export interface Car {
    id: number;
    Brand: string;
    Model: string;
    DoorsNumber: number;
    LuggageCapacity: number;
    EngineCapacity: number;
    FuelType: FuelType;
    ProductionDate: Date;
    CarFuelConsumption: number;
    BodyType: BodyType;
}