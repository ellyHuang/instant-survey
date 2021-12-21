import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const resultBar = ({Yes, No}) => {
    const labels = ['result'];

    const data = {
        labels,
        datasets: [
        {
            label: 'YES',
            data: [Yes],
            backgroundColor: 'rgba(255, 102, 52, 0.8)',
        },
        {
            label: 'NO',
            data: [No],
            backgroundColor: 'rgba(68,84,107, 0.8)',
        },
        ],
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
            stacked: true,
            display: false,
            ticks: {
                display: false
            },
            grid: {
                display: false
            }},

            y: {
            stacked: true,
            display: false,
            ticks: {
                display: true
            },
            grid: {
                display: false
            }},
        },

        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend:{
            display:false
            },
            title: {
            display: false,
            text: 'result Horizontal Bar ',
            },
        },
    };

    return(
        <div>
            <Bar data={data} options={options} height={50}/>
        </div>
    )
}

export default resultBar;