import { Student } from '@/types/student';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
}

export const StudentCard = ({ student, onClick }: StudentCardProps) => {
  return (
    <Card 
      className="p-6 cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 bg-gradient-card border-border/50"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 ring-2 ring-primary/10">
          <AvatarImage src={student.ccphoto || student.photo} alt={student.name} />
          <AvatarFallback className="bg-primary/5 text-primary font-semibold">
            {student.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">
            {student.name}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            {student.rollno}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {student.department}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {student.gender}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};