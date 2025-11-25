export enum FuelType {
    Petrol = "Petrol",
    Hybrid = "Hybrid",
    Diesel = "Diesel",
    LPG = "LPG"
}
export const FuelTypeMap: Record<number, FuelType> = {
    0: FuelType.Petrol,
    1: FuelType.Hybrid,
    2: FuelType.Diesel,
    3: FuelType.LPG
};

export enum BodyType {
    Hatchback = "Hatchback",
    Sedan = "Sedan",
    Kombi = "Kombi",
    SUV = "SUV",
    Roadster = "Roadster"
}
export interface Car {
    id: number;
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: FuelType;
    productionDate: Date;
    carFuelConsumption: number;
    bodyType: BodyType;
}