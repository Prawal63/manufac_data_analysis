import React, { useEffect, useState } from 'react';
import { fetchData } from './data/fetchData';
import { transformData, getYearlyProduction, getCropAverages } from './utils/dataProcessing';
import YearlyProductionTable from './components/YearlyProductionTable';
import CropAverageTable from './components/CropAverageTable';
import { Paper } from '@mantine/core'; 

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

const App: React.FC = () => {
 
    const [yearlyData, setYearlyData] = useState<YearlyProduction[]>([]);
    const [averageData, setAverageData] = useState<CropAverage[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const rawData = await fetchData();
            const data = transformData(rawData);

            setYearlyData(getYearlyProduction(data));
            setAverageData(getCropAverages(data));
        };

        loadData();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Agriculture Data Analysis</h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <Paper >
                        <h2>Yearly Production Table</h2>
                        <YearlyProductionTable data={yearlyData} />
                    </Paper>
                </div>

                <div>
                    <Paper >
                        <h2>Crop Average Table</h2>
                        <CropAverageTable data={averageData} />
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default App;
