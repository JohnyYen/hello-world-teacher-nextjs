'use client';

import { useState, useEffect } from 'react';
import { 
  getStudentsForCourse, 
  getAverageGradeForCourse, 
  getPerformanceDistributionForCourse, 
  getTopStudentsForCourse, 
  getActivitiesForCourse, 
  getHardestActivities, 
  getTopicsForCourse, 
  getPerformanceIssuesForCourse,
  getMostRecentCourse
} from '@/components/reports/reports-data-provider';
import CourseSelector from '@/components/reports/course-selector';
import AverageGradesChart from '@/components/reports/average-grades-chart';
import PerformanceDistributionChart from '@/components/reports/performance-distribution-chart';
import StudentRanking from '@/components/reports/student-ranking';
import IndividualStudentPerformance from '@/components/reports/individual-student-performance';
import DifficultActivities from '@/components/reports/difficult-activities';
import TopicBasedResults from '@/components/reports/topic-based-results';
import AreasOfStruggle from '@/components/reports/areas-of-struggle';

export default function ReportsPage() {
  const [course, setCourse] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [averageGrade, setAverageGrade] = useState<number>(0);
  const [performanceDist, setPerformanceDist] = useState<{ alta: number; media: number; baja: number }>({ alta: 0, media: 0, baja: 0 });
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hardestActivities, setHardestActivities] = useState<Activity[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [performanceIssues, setPerformanceIssues] = useState<PerformanceIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Types for our data
  type Student = {
    id: string;
    name: string;
    course: string;
    averageGrade: number;
    performanceLevel: "alta" | "media" | "baja";
    completedLessons: number;
    totalLessons: number;
    progress: number;
    achievements: string[];
  };

  type Activity = {
    id: string;
    name: string;
    difficulty: number; // 1-10 scale
    averageScore: number; // 0-100 percentage
    topic: string;
  };

  type Topic = {
    id: string;
    name: string;
    averageScore: number; // 0-100 percentage
  };

  type PerformanceIssue = {
    topic: string;
    percentage: number; // Percentage of students struggling (0-100)
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const mostRecentCourse = await getMostRecentCourse();
        setCourse(mostRecentCourse);
        await loadCourseData(mostRecentCourse);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const loadCourseData = async (course: string) => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [
        studentsData,
        avgGrade,
        perfDist,
        topStudentsData,
        activitiesData,
        hardestActs,
        topicsData,
        issuesData
      ] = await Promise.all([
        getStudentsForCourse(course),
        getAverageGradeForCourse(course),
        getPerformanceDistributionForCourse(course),
        getTopStudentsForCourse(course),
        getActivitiesForCourse(course),
        getHardestActivities(course),
        getTopicsForCourse(course),
        getPerformanceIssuesForCourse(course)
      ]);
      
      // Update state with fetched data
      setStudents(studentsData);
      setAverageGrade(avgGrade);
      setPerformanceDist(perfDist);
      setTopStudents(topStudentsData);
      setActivities(activitiesData);
      setHardestActivities(hardestActs);
      setTopics(topicsData);
      setPerformanceIssues(issuesData);
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = async (selectedCourse: string) => {
    setCourse(selectedCourse);
    await loadCourseData(selectedCourse);
  };

//   if (loading) {
//     return (
//       <div className="container mx-auto py-10">
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg text-muted-foreground">Cargando reportes...</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reportes de Curso</h1>
        <p className="text-muted-foreground">Visualización y análisis del rendimiento de estudiantes</p>
      </div>

      <CourseSelector onCourseChange={handleCourseChange} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AverageGradesChart course={course} averageGrade={averageGrade} />
        <PerformanceDistributionChart 
          alta={performanceDist.alta} 
          media={performanceDist.media} 
          baja={performanceDist.baja} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StudentRanking students={topStudents} />
        <IndividualStudentPerformance students={students} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DifficultActivities activities={hardestActivities} />
        <TopicBasedResults topics={topics} />
      </div>

      <div className="mb-6">
        <AreasOfStruggle performanceIssues={performanceIssues} />
      </div>
    </div>
  );
}