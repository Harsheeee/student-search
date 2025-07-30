import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { parseCSVFromText } from '@/utils/csvParser';
import { useToast } from '@/hooks/use-toast';

export const useStudentData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetch('/students.csv');
        if (!response.ok) {
          throw new Error('Failed to load student data');
        }
        const csvText = await response.text();
        const parsedStudents = parseCSVFromText(csvText);
        setStudents(parsedStudents);
        toast({
          title: "Student Data Loaded",
          description: `${parsedStudents.length} students loaded successfully.`,
        });
      } catch (error) {
        console.error('Error loading student data:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load student data. Please check the CSV file.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, [toast]);

  return { students, isLoading };
};