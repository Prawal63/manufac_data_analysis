import indiaAgroData from './indiaagrodata.json'; 

export interface RawCropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string | number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
    "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
}

export const fetchData = async (): Promise<RawCropData[]> => {
    return indiaAgroData.map((entry: RawCropData) => ({
        ...entry,
        "Crop Production (UOM:t(Tonnes))": +entry["Crop Production (UOM:t(Tonnes))"] || 0,
        "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": +entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
        "Area Under Cultivation (UOM:Ha(Hectares))": +entry["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
    }));
};
