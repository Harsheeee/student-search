import { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FilterState } from '@/types/student';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  departments: string[];
  totalStudents: number;
  filteredCount: number;
}

const DEBOUNCE_MS = 300;

export const FilterBar = ({
  filters,
  onFiltersChange,
  departments,
  totalStudents,
  filteredCount,
}: FilterBarProps) => {
  // local search state (debounced)
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // Clean / normalized department list for the dropdown (trim & remove falsy)
  const deptOptions = useMemo(() => {
    const set = new Set<string>();
    for (const d of departments || []) {
      const t = (d ?? '').toString().trim();
      if (t) set.add(t);
    }
    return Array.from(set).sort();
  }, [departments]);

  // When parent filters.search changes externally, sync local input immediately
  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  // Debounce localSearch -> call parent onFiltersChange
  useEffect(() => {
    const id = setTimeout(() => {
      // Normalize search: trim. Parent's filterStudents is case-insensitive, so no lowercasing here.
      const trimmed = localSearch.trim();
      if (trimmed !== (filters.search || '').trim()) {
        onFiltersChange({ ...filters, search: trimmed });
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]); // we intentionally only react to localSearch changes

  // helper to set select values and normalize them (map "all" -> '')
  const handleSelectChange = (partial: Partial<FilterState>) => {
    // trim strings and convert "all" to ''
    const cleaned: FilterState = {
      search: filters.search || '',
      gender: filters.gender || '',
      department: filters.department || '',
      batch: filters.batch || '',
      ...partial,
    } as FilterState;

    // normalize every field to trimmed string
    cleaned.search = (cleaned.search ?? '').toString().trim();
    cleaned.gender = (cleaned.gender ?? '').toString().trim();
    cleaned.department = (cleaned.department ?? '').toString().trim();
    cleaned.batch = (cleaned.batch ?? '').toString().trim();

    // map explicit "all" token to empty string
    if (cleaned.gender === 'all') cleaned.gender = '';
    if (cleaned.department === 'all') cleaned.department = '';
    if (cleaned.batch === 'all') cleaned.batch = '';

    onFiltersChange(cleaned);
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Students</h3>
          <div className="ml-auto text-sm text-muted-foreground">
            Showing {filteredCount} of {totalStudents} students
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={(filters.gender && filters.gender !== '' ? filters.gender : 'all')}
            onValueChange={(value) => handleSelectChange({ gender: value === 'all' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={(filters.batch && filters.batch !== '' ? filters.batch : 'all')}
            onValueChange={(value) => handleSelectChange({ batch: value === 'all' ? '' : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="25">Y25</SelectItem>
              <SelectItem value="24">Y24</SelectItem>
              <SelectItem value="23">Y23</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={(filters.department && filters.department !== '' ? filters.department : 'all')}
            onValueChange={(value) =>
              handleSelectChange({ department: value === 'all' ? '' : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {deptOptions.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(filters.search || filters.gender || filters.department || filters.batch) && (
          <Button
            variant="secondary"
            onClick={() => onFiltersChange({ search: '', gender: '', department: '', batch: '' })}
            className="mt-4"
          >
            Clear Filters
          </Button>
        )}
      </Card>
    </div>
  );
};
