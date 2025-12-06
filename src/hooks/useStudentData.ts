import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { loadAllStudents } from '@/utils/loadAllStudents';
import { useToast } from '@/hooks/use-toast';

export const useStudentData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);

        const rows = await loadAllStudents(1000); // fetch in batches
        if (!mounted) return;

        setStudents(rows);

        toast?.({
          title: 'Student Data Loaded',
          description: `${rows.length} students loaded.`,
        });
      } catch (err: any) {
        console.error('Error loading students:', err);
        toast?.({
          title: 'Loading Error',
          description: err?.message || 'Failed to load students from DB',
          variant: 'destructive',
        });
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [toast]);

  return { students, isLoading, setStudents };
};
