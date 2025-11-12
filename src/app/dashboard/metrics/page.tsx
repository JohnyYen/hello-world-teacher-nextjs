'use client';

import { useState, useEffect } from 'react';
import { 
  getMetricSummary, 
  getStudentProgress, 
  getCourseCompletion, 
  getDailyActivity, 
  getActivityPerformance
} from '@/components/metrics/metrics-data-provider';
import MetricsSummary from '@/components/metrics/metrics-summary';
import StudentProgressChart from '@/components/metrics/student-progress-chart';
import CourseCompletionChart from '@/components/metrics/course-completion-chart';
import EngagementMetrics from '@/components/metrics/engagement-metrics';
import ActivityPerformanceChart from '@/components/metrics/activity-performance-chart';

export default function MetricsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [metricSummary, setMetricSummary] = useState<MetricSummary | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [courseCompletion, setCourseCompletion] = useState<CourseCompletion[]>([]);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);
  const [activityPerformance, setActivityPerformance] = useState<ActivityPerformance[]>([]);

  // Types for data
  type MetricSummary = {
    totalStudents: number;
    activeStudents: number;
    avgCompletionRate: number;
    avgScore: number;
    totalCourses: number;
    activeCourses: number;
  };

  type StudentProgress = {
    id: string;
    name: string;
    progress: number;
    score: number;
    lastActivity: string;
  };

  type CourseCompletion = {
    courseId: string;
    courseName: string;
    completionRate: number;
    enrolled: number;
    completed: number;
  };

  type DailyActivity = {
    date: string;
    activityCount: number;
    avgTimeSpent: number;
  };

  type ActivityPerformance = {
    activityId: string;
    name: string;
    avgScore: number;
    completionRate: number;
    difficulty: number;
  };

  useEffect(() => {
    const loadMetricsData = async () => {
      try {
        setLoading(true);
        
        // Fetch all metrics data in parallel
        const [
          summary,
          studentProgressData,
          courseCompletionData,
          dailyActivityData,
          activityPerformanceData
        ] = await Promise.all([
          getMetricSummary(),
          getStudentProgress(),
          getCourseCompletion(),
          getDailyActivity(),
          getActivityPerformance()
        ]);
        
        setMetricSummary(summary);
        setStudentProgress(studentProgressData);
        setCourseCompletion(courseCompletionData);
        setDailyActivity(dailyActivityData);
        setActivityPerformance(activityPerformanceData);
      } catch (error) {
        console.error('Error loading metrics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetricsData();
  }, []);

  if (loading || !metricSummary) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-muted-foreground">Cargando métricas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Métricas del Sistema</h1>
        <p className="text-muted-foreground">Visualización y análisis del rendimiento del sistema educativo</p>
      </div>

      <MetricsSummary 
        totalStudents={metricSummary.totalStudents}
        activeStudents={metricSummary.activeStudents}
        avgCompletionRate={metricSummary.avgCompletionRate}
        avgScore={metricSummary.avgScore}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StudentProgressChart students={studentProgress} />
        <CourseCompletionChart courses={courseCompletion} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EngagementMetrics dailyActivity={dailyActivity} />
        <ActivityPerformanceChart activities={activityPerformance} />
      </div>
    </div>
  );
}