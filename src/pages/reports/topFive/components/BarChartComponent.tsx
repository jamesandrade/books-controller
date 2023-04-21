import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList, Label } from "recharts";
import { useMediaQuery } from '@mui/material';

interface Data {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: Data[];
}

const BarChartComponent: React.FC<Props> = ({ data }) => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  return (
    <BarChart width={isSmallScreen ? 300 : 650} height={isSmallScreen ? 250 : 300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label">
      <Label
          value="Alunos"
          position="insideBottom"
          fill="#4F4F4F"
        />
      </XAxis>
      <YAxis>
        <Label
          value="Livros"
          angle={-90}
          position="insideLeft"
          fill="#4F4F4F"
        />
      </YAxis>
      <Bar label={{ position: "top", fill:"#4F4F4F" }}  dataKey="value">
      <LabelList
        dataKey="label"
        position="insideBottom"
        angle={0}
        style={{fontFamily: "'Roboto', sans-serif", fontSize: '0.75rem'}}
        offset={25}
        fill="black"
      />
        {
        data.map((item, index) => <Cell fill={item.color}/>)
        }
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;