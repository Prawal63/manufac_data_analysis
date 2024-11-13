import { RawCropData } from "../data/fetchData";

interface CropData {
    year: string;
    cropName: string;
    production: number;
    yield: number;
    area: number;
}

interface YearlyProduction {
    year: number;
    maxCrop: string;
    minCrop: string;
}

interface CropAverage {
    crop: string;
    avgYield: number;
    avgArea: number;
}

const parseYear = (yearStr: string): number => {
    const match = yearStr.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
};

export const transformData = (rawData: RawCropData[]): CropData[] => {
    return rawData.map((entry) => ({
        year: entry.Year,
        cropName: entry["Crop Name"],
        production: +entry["Crop Production (UOM:t(Tonnes))"] || 0,
        yield: +entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
        area: +entry["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
    }));
};

export const getYearlyProduction = (data: CropData[]): YearlyProduction[] => {
    const yearlyProduction: YearlyProduction[] = [];

    const dataByYear = data.reduce((acc, item) => {
        const year = parseYear(item.year);
        if (!acc[year]) acc[year] = [];
        acc[year].push({ cropName: item.cropName, production: item.production });
        return acc;
    }, {} as { [year: number]: { cropName: string; production: number }[] });

    for (const year in dataByYear) {
        const crops = dataByYear[+year];
        let maxCrop = crops[0];
        let minCrop = crops[0];

        crops.forEach((crop) => {
            if (crop.production > maxCrop.production) maxCrop = crop;
            if (crop.production < minCrop.production) minCrop = crop;
        });

        yearlyProduction.push({
            year: +year,
            maxCrop: maxCrop.cropName,
            minCrop: minCrop.cropName,
        });
    }

    return yearlyProduction;
};

export const getCropAverages = (data: CropData[]): CropAverage[] => {
    const cropTotals: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

    data.forEach((crop) => {
        if (!cropTotals[crop.cropName]) {
            cropTotals[crop.cropName] = { totalYield: 0, totalArea: 0, count: 0 };
        }
        cropTotals[crop.cropName].totalYield += crop.yield;
        cropTotals[crop.cropName].totalArea += crop.area;
        cropTotals[crop.cropName].count += 1;
    });

    const cropAverages: CropAverage[] = Object.keys(cropTotals).map((crop) => ({
        crop,
        avgYield: cropTotals[crop].totalYield / cropTotals[crop].count,
        avgArea: cropTotals[crop].totalArea / cropTotals[crop].count,
    }));

    return cropAverages;
};
