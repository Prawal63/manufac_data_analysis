import React from 'react';
import { Table, Container } from '@mantine/core';

interface CropAverageTableProps {
    data: { crop: string; avgYield: number; avgArea: number }[];
}

const CropAverageTable: React.FC<CropAverageTableProps> = ({ data }) => {
    return (
        <Container>
            <Table
                border={1}
                style={{width: '100%',  borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th>Crop</th>
                        <th>Average Yield (Kg/Ha)</th>
                        <th>Average Area (Ha)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.crop}>
                            <td>{row.crop}</td>
                            <td>{row.avgYield.toFixed(3)}</td>
                            <td>{row.avgArea.toFixed(3)}</td>
                        </tr>
                    ))}
                </tbody>

                <style>
                    {`th, td { padding: 10px; }`}
                </style>
                
            </Table>
        </Container>
    );
};

export default CropAverageTable;
