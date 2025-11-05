'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, TrendingUp, Activity, Target } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import React from "react";

// Define types for our data
type LevelProgress = {
  level: number;
  timeSpent: number; // in minutes
  date: string;
  accuracy: number; // percentage
  attempts: number;
};

type StudentReport = {
  id: string;
  name: string;
  levelProgress: LevelProgress[];
  averageGroupAccuracy: number;
  studentAccuracy: number;
  successRate: number;
  errorRate: number;
  commonDifficulties: { level: number; difficulty: string; frequency: number }[];
  activeDates: { date: string; activity: number }[];
};

// Mock data for student reports
const mockStudentReport: Record<string, StudentReport> = {
  "1": {
    id: "1",
    name: "Juan Pérez",
    levelProgress: [
      { level: 1, timeSpent: 45, date: "2024-09-01", accuracy: 85, attempts: 3 },
      { level: 2, timeSpent: 60, date: "2024-09-03", accuracy: 70, attempts: 5 },
      { level: 3, timeSpent: 90, date: "2024-09-07", accuracy: 75, attempts: 4 },
      { level: 4, timeSpent: 120, date: "2024-09-10", accuracy: 80, attempts: 3 },
      { level: 5, timeSpent: 75, date: "2024-09-15", accuracy: 90, attempts: 2 },
      { level: 6, timeSpent: 100, date: "2024-09-20", accuracy: 85, attempts: 3 },
      { level: 7, timeSpent: 110, date: "2024-09-25", accuracy: 78, attempts: 4 },
      { level: 8, timeSpent: 130, date: "2024-09-30", accuracy: 82, attempts: 3 },
    ],
    averageGroupAccuracy: 75,
    studentAccuracy: 82,
    successRate: 82,
    errorRate: 18,
    commonDifficulties: [
      { level: 2, difficulty: "Bucles anidados", frequency: 4 },
      { level: 3, difficulty: "Funciones recursivas", frequency: 3 },
      { level: 5, difficulty: "Manejo de errores", frequency: 2 },
    ],
    activeDates: [
      { date: "2024-09-01", activity: 2 },
      { date: "2024-09-02", activity: 0 },
      { date: "2024-09-03", activity: 3 },
      { date: "2024-09-04", activity: 1 },
      { date: "2024-09-05", activity: 0 },
      { date: "2024-09-06", activity: 0 },
      { date: "2024-09-07", activity: 4 },
      { date: "2024-09-08", activity: 2 },
      { date: "2024-09-09", activity: 0 },
      { date: "2024-09-10", activity: 5 },
      { date: "2024-09-11", activity: 1 },
      { date: "2024-09-12", activity: 0 },
      { date: "2024-09-13", activity: 0 },
      { date: "2024-09-14", activity: 0 },
      { date: "2024-09-15", activity: 3 },
    ]
  },
  "2": {
    id: "2",
    name: "María González",
    levelProgress: [
      { level: 1, timeSpent: 30, date: "2024-09-01", accuracy: 95, attempts: 2 },
      { level: 2, timeSpent: 40, date: "2024-09-02", accuracy: 90, attempts: 2 },
      { level: 3, timeSpent: 50, date: "2024-09-04", accuracy: 88, attempts: 3 },
      { level: 4, timeSpent: 60, date: "2024-09-06", accuracy: 92, attempts: 2 },
      { level: 5, timeSpent: 70, date: "2024-09-08", accuracy: 95, attempts: 1 },
      { level: 6, timeSpent: 80, date: "2024-09-10", accuracy: 93, attempts: 2 },
      { level: 7, timeSpent: 90, date: "2024-09-12", accuracy: 91, attempts: 2 },
      { level: 8, timeSpent: 100, date: "2024-09-14", accuracy: 94, attempts: 1 },
      { level: 9, timeSpent: 110, date: "2024-09-16", accuracy: 96, attempts: 1 },
      { level: 10, timeSpent: 120, date: "2024-09-18", accuracy: 98, attempts: 1 },
    ],
    averageGroupAccuracy: 75,
    studentAccuracy: 94,
    successRate: 94,
    errorRate: 6,
    commonDifficulties: [
      { level: 3, difficulty: "Funciones recursivas", frequency: 2 },
      { level: 6, difficulty: "Manejo de errores", frequency: 1 },
    ],
    activeDates: [
      { date: "2024-09-01", activity: 4 },
      { date: "2024-09-02", activity: 5 },
      { date: "2024-09-03", activity: 0 },
      { date: "2024-09-04", activity: 3 },
      { date: "2024-09-05", activity: 0 },
      { date: "2024-09-06", activity: 4 },
      { date: "2024-09-07", activity: 0 },
      { date: "2024-09-08", activity: 4 },
      { date: "2024-09-09", activity: 0 },
      { date: "2024-09-10", activity: 5 },
      { date: "2024-09-11", activity: 0 },
      { date: "2024-09-12", activity: 4 },
      { date: "2024-09-13", activity: 0 },
      { date: "2024-09-14", activity: 5 },
      { date: "2024-09-15", activity: 0 },
    ]
  }
};

// Function to generate heatmap data
const generateHeatmapData = (activeDates: { date: string; activity: number }[]) => {
  const result = [];
  const startDate = new Date('2024-09-01');
  const endDate = new Date('2024-09-30');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const activityData = activeDates.find(ad => ad.date === dateStr);
    
    result.push({
      date: dateStr,
      activity: activityData ? activityData.activity : 0,
    });
  }
  
  return result;
};

export default function StudentReportPage({ params }: { params: { id: string } }) {
  const studentReport = mockStudentReport[params.id];

  if (!studentReport) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Reporte no encontrado</CardTitle>
            <CardDescription>
              No se encontró el reporte para el estudiante con ID {params.id}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/students/${params.id}`}>
              <Button variant="outline">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Volver al perfil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for the time spent chart
  const timeSpentData = studentReport.levelProgress.map(item => ({
    level: `Nivel ${item.level}`,
    timeSpent: item.timeSpent,
    date: item.date
  }));

  // Prepare heatmap data
  const heatmapData = generateHeatmapData(studentReport.activeDates);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href={`/dashboard/students/${params.id}`}>
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver al perfil
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reporte de Progreso</h1>
            <p className="text-muted-foreground">Progreso de {studentReport.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              {studentReport.levelProgress.length} niveles
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Spent Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tiempo Invertido por Nivel</CardTitle>
            <CardDescription>Duración promedio de juego por nivel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeSpentData}
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

        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Diaria</CardTitle>
            <CardDescription>Días activos en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-1">
              {heatmapData.map((day, index) => {
                let intensity = "bg-gray-200";
                if (day.activity > 0) {
                  intensity = day.activity >= 4 ? "bg-green-500" : 
                            day.activity >= 2 ? "bg-green-300" : "bg-green-100";
                }
                
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-sm ${intensity} tooltip`}
                    title={`${day.date}: ${day.activity} actividades`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Baja</span>
              <span>Alta</span>
            </div>
          </CardContent>
        </Card>

        {/* Student vs Group Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Comparación de Rendimiento</CardTitle>
            <CardDescription>Exactitud del estudiante vs promedio del grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{studentReport.studentAccuracy}%</div>
                <div className="text-sm text-muted-foreground">Estudiante</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">{studentReport.averageGroupAccuracy}%</div>
                <div className="text-sm text-muted-foreground">Promedio Grupo</div>
              </div>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${studentReport.studentAccuracy}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span>0%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Success/Error Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Aciertos/Errores</CardTitle>
            <CardDescription>Proporción de respuestas correctas por nivel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{studentReport.successRate}%</div>
                <div className="text-sm text-muted-foreground">Aciertos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{studentReport.errorRate}%</div>
                <div className="text-sm text-muted-foreground">Errores</div>
              </div>
            </div>
            <div className="mt-4 flex">
              <div 
                className="h-4 bg-green-500 rounded-l-full" 
                style={{ width: `${studentReport.successRate}%` }}
              ></div>
              <div 
                className="h-4 bg-red-500 rounded-r-full" 
                style={{ width: `${studentReport.errorRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span>0%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Common Difficulties */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dificultades Comunes</CardTitle>
            <CardDescription>Áreas donde el estudiante requiere más apoyo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentReport.commonDifficulties.map((difficulty, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nivel {difficulty.level}</CardTitle>
                    <CardDescription className="text-sm">{difficulty.difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <Badge variant="secondary">{difficulty.frequency}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {studentReport.commonDifficulties.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No se han identificado dificultades comunes</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}