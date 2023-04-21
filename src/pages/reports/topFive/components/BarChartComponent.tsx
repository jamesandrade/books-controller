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

let colors = [
  { position: 1, color: "#FFD700" },
  { position: 2, color: "#C0C0C0" },
  { position: 3, color: "#cd7f32" },
  { position: 4, color: "#FF6347" },
  { position: 5, color: "#6B8E23" },
]
const BarChartComponent: React.FC<Props> = ({ data }) => {
  const maxX = Math.max(...data.map((item) => item.value));
  const maxY = Math.ceil((maxX + 1) / 1);
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
      <YAxis
        domain={[0, maxY]}
        tickCount={maxY + 1}>
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
          position="inside"
          angle={0}
          style={{fontFamily: "'Roboto', sans-serif", fontSize: '0.75rem', paddingBottom: 0}}
          offset={25}
          fill="black"
        />
          {
            data.map((item, index) => {
              const colorObj = colors.find((c) => c.position === index + 1);
              const color = colorObj ? colorObj.color : 'gray';
              return <Cell key={index} fill={color} />;
            })
          }
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;