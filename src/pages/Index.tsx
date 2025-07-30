import { useState, useEffect, useMemo, useCallback } from 'react';
import { Student, FilterState } from '@/types/student';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { FilterBar } from '@/components/FilterBar';
import { filterStudents } from '@/utils/csvParser';
import { useStudentData } from '@/hooks/useStudentData';
import { Loader2, Users } from 'lucide-react';

const ITEMS_PER_PAGE = 50;

const Index = () => {
  const { students: allStudents, isLoading } = useStudentData();
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    gender: '',
    department: ''
  });

  // Filter students based on current filters
  const filteredStudents = useMemo(() => {
    return filterStudents(allStudents, filters);
  }, [allStudents, filters]);

  // Get unique departments for filter dropdown
  const departments = useMemo(() => {
    const uniqueDepts = new Set(allStudents.map(student => student.department));
    return Array.from(uniqueDepts).sort();
  }, [allStudents]);

  // Update displayed students when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedStudents(filteredStudents.slice(0, ITEMS_PER_PAGE));
  }, [filteredStudents]);

  // Load more students for infinite scroll
  const loadMoreStudents = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newStudents = filteredStudents.slice(startIndex, endIndex);
    
    if (newStudents.length > 0) {
      setDisplayedStudents(prev => [...prev, ...newStudents]);
      setCurrentPage(nextPage);
    }
  }, [currentPage, filteredStudents]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreStudents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreStudents]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const hasMoreStudents = displayedStudents.length < filteredStudents.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-12 w-12" />
              <h1 className="text-4xl font-bold">Student Search</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          departments={departments}
          totalStudents={allStudents.length}
          filteredCount={filteredStudents.length}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading student data...</span>
          </div>
        )}

        {/* Students Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {displayedStudents.map((student) => (
                <StudentCard
                  key={student.rollno}
                  student={student}
                  onClick={() => handleStudentClick(student)}
                />
              ))}
            </div>

            {/* Load More Indicator */}
            {hasMoreStudents && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading more students...</span>
              </div>
            )}

            {/* No Results */}
            {filteredStudents.length === 0 && allStudents.length > 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No students found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Student Detail Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;