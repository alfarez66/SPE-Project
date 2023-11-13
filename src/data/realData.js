import axios from "../api/axios";
import { tokens } from "../theme";

export const LineData = [
    {
        "reportid": 3,
        "date": "2023-10-08T17:00:00.000Z",
        "completeness_score": 0.8333333333333334
    },
    {
        "reportid": 10,
        "date": "2023-10-14T17:00:00.000Z",
        "completeness_score": 0.5
    },
    {
        "reportid": 12,
        "date": "2023-10-16T17:00:00.000Z",
        "completeness_score": 1
    },
    {
        "reportid": 13,
        "date": "2023-10-16T17:00:00.000Z",
        "completeness_score": 1
    },
    {
        "reportid": 14,
        "date": "2023-10-17T17:00:00.000Z",
        "completeness_score": 0.3333333333333333
    },
    {
        "reportid": 16,
        "date": "2023-10-17T17:00:00.000Z",
        "completeness_score": 1
    },
    {
        "reportid": 17,
        "date": "2023-10-17T17:00:00.000Z",
        "completeness_score": 1
    },
    {
        "reportid": 15,
        "date": "2023-10-16T17:00:00.000Z",
        "completeness_score": 0.6666666666666666
    },
    {
        "reportid": 11,
        "date": "2023-10-15T17:00:00.000Z",
        "completeness_score": 0.6666666666666666
    },
    {
        "reportid": 18,
        "date": "2023-10-30T17:00:00.000Z",
        "completeness_score": 0.8333333333333334
    },
    {
        "reportid": 19,
        "date": "2023-10-31T17:00:00.000Z",
        "completeness_score": 0.8333333333333334
    }
]

// Group the data by month
const dataByMonth = LineData.reduce((acc, data) => {
    const date = new Date(data.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
        acc[month] = {
            dates: [],
            scores: [],
        };
    }
    
    acc[month].dates.push(data.date);
    acc[month].scores.push(data.completeness_score);
    
    return acc;
}, {});

// Calculate average completeness scores for each month
const averagedData = Object.keys(dataByMonth).map(month => {
    const { dates, scores } = dataByMonth[month];
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
        month,
        averageScore,
    };
});
console.log('average',averagedData)

export default averagedData;