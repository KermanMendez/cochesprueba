export interface ICoche {

    "id": String
    "marca": String
    "modelo": String
    "matricula": String
    "kms": number,
    "precio": number,
    "tipo": Type[],
    "fotoURL": String
}

export enum Type {
    DEPORTIVO = "Deportivo",
    CLASICO = "Clásico",
    GASOLINA = "Gasolina",
    DIESEL = "Diesel",
    HIBRIDO = "Híbrido",
    SUV = "SUV"
}