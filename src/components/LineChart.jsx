import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData,className }) {
return(
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
    )
}

export default LineChart;