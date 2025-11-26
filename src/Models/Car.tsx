export enum FuelType {
    Petrol = "Petrol",
    Hybrid = "Hybrid",
    Diesel = "Diesel",
    LPG = "LPG"
}
export const FuelTypeMap: Record<number, FuelType> = {
    1: FuelType.Petrol,
    2: FuelType.Hybrid,
    3: FuelType.Diesel,
    4: FuelType.LPG
};

export enum BodyType {
    Hatchback = "Hatchback",
    Sedan = "Sedan",
    Kombi = "Kombi",
    SUV = "SUV",
    Roadster = "Roadster"
}
export const BodyTypeMap: Record<number, BodyType> = {
    1: BodyType.Hatchback,
    2: BodyType.Sedan,
    3: BodyType.Kombi,
    4: BodyType.SUV,
    5: BodyType.Roadster
};
export interface Car {
    id: string;
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