import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type LevelProgress = {
  level: string;
  timeSpent: number; // in minutes
  date: string;
};

type TimeSpentChartProps = {
  data: LevelProgress[];
};

export function TimeSpentChart({ data }: TimeSpentChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiempo Invertido por Nivel</CardTitle>
        <CardDescription>Duración promedio de juego por nivel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis unit="min" />
              <Tooltip 
                formatter={(value) => [`${value} minutos`, 'Tiempo Invertido']}
                labelFormatter={(label) => `Nivel: ${label.replace('Nivel ', '')}`}
              />
              <Area type="monotone" dataKey="timeSpent" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}