import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const BusyDayChart = ({ data1, data2 }) => {
  const combinedData = [];
  const dayMap = new Map();

  data1.forEach(item => {
    dayMap.set(item.day, { day: item.day, count1: item.count, count2: 0 });
  });

  data2.forEach(item => {
    if (dayMap.has(item.day)) {
      dayMap.get(item.day).count2 = item.count;
    } else {
      dayMap.set(item.day, { day: item.day, count1: 0, count2: item.count });
    }
  });

  dayMap.forEach(value => combinedData.push(value));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Comparison of Most Busy Days of the Week
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={combinedData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count1" fill="#8884d8" name="Dataset 1" />
          <Bar dataKey="count2" fill="#82ca9d" name="Dataset 2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BusyDayChart;
