'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllCourses, getMostRecentCourse } from "./reports-data-provider";
import { useEffect, useState } from "react";

type CourseSelectorProps = {
  onCourseChange: (course: string) => void;
  initialCourse?: string;
};

export default function CourseSelector({ onCourseChange, initialCourse }: CourseSelectorProps) {
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourse || "");

  useEffect(() => {
    const loadCourses = async () => {
      const courseList = await getAllCourses();
      setCourses(courseList);
      
      // Set default to the most recent course if no initial course is provided
      if (!initialCourse) {
        const mostRecent = await getMostRecentCourse();
        setSelectedCourse(mostRecent);
        onCourseChange(mostRecent);
      } else {
        setSelectedCourse(initialCourse);
      }
    };

    loadCourses();
  }, [initialCourse, onCourseChange]);

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    onCourseChange(value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-4">
        <label htmlFor="course-select" className="text-sm font-medium">
          Seleccionar Curso:
        </label>
        <Select value={selectedCourse} onValueChange={handleCourseChange}>
          <SelectTrigger id="course-select" className="w-[200px]">
            <SelectValue placeholder="Seleccionar curso" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}