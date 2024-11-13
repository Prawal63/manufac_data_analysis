import React from 'react';
import { Table, Container } from '@mantine/core';

interface YearlyProductionTableProps {
    data: { year: number; maxCrop: string; minCrop: string }[];
}

const YearlyProductionTable: React.FC<YearlyProductionTableProps> = ({ data }) => {
    return (
        <Container>
            <Table
                border={1}
                style={{  width: '100%',  borderCollapse: 'collapse',}}>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Max Production Crop</th>
                        <th>Min Production Crop</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{row.maxCrop}</td>
                            <td>{row.minCrop}</td>
                        </tr>
                    ))}
                </tbody>

                <style>
                    {`th, td {padding: 10px;} `}
                </style>

            </Table>
        </Container>
    );
};

export default YearlyProductionTable;
