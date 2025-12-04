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

export const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  departments, 
  totalStudents, 
  filteredCount 
}: FilterBarProps) => {
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
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
          
          <Select 
            value={filters.gender || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, gender: value === "all" ? "" : value })}
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
            value={filters.batch || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, batch: value === "all" ? "" : value })}
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
            value={filters.department || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, department: value === "all" ? "" : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
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