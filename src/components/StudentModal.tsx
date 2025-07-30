import { Student } from '@/types/student';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, MapPin, Home, Droplets, GraduationCap, Building } from 'lucide-react';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentModal = ({ student, isOpen, onClose }: StudentModalProps) => {
  if (!student) return null;

  const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Student Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header with photo and basic info */}
          <Card className="bg-gradient-primary border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6 text-white">
                <Avatar className="h-24 w-24 ring-4 ring-white/20">
                  <AvatarImage src={student.photo} alt={student.name} />
                  <AvatarFallback className="bg-white/10 text-white text-xl font-bold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <p className="text-lg font-mono opacity-90">{student.rollno}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {student.program}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {student.gender}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed information grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              icon={Mail} 
              label="Username" 
              value={student.username} 
            />
            <InfoItem 
              icon={Building} 
              label="Department" 
              value={student.department} 
            />
            <InfoItem 
              icon={GraduationCap} 
              label="Program" 
              value={student.program} 
            />
            <InfoItem 
              icon={Home} 
              label="Hall" 
              value={student.hall} 
            />
            <InfoItem 
              icon={MapPin} 
              label="Room" 
              value={student.room} 
            />
            <InfoItem 
              icon={Droplets} 
              label="Blood Group" 
              value={student.bloodgroup} 
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};