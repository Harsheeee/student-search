import Papa from 'papaparse';
import { Student } from '@/types/student';

export const parseCSV = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const students: Student[] = results.data.map((row: any) => ({
            name: row.name || '',
            rollno: row.rollno || '',
            username: row.username || '',
            program: row.program || '',
            department: row.department || '',
            hall: row.hall || '',
            room: row.room || '',
            gender: row.gender || '',
            bloodgroup: row.bloodgroup || '',
            photo: row.photo || '/placeholder.svg'
          }));
          resolve(students);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const parseCSVFromText = (csvText: string): Student[] => {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });
  
  return results.data.map((row: any) => ({
    name: row.name || '',
    rollno: row.rollno || '',
    username: row.username || '',
    program: row.program || '',
    department: row.department || '',
    hall: row.hall || '',
    room: row.room || '',
    gender: row.gender || '',
    bloodgroup: row.bloodgroup || '',
    photo: row.photo || '/placeholder.svg'
  }));
};

export const filterStudents = (students: Student[], filters: { search: string; gender: string; department: string }) => {
  return students.filter(student => {
    const searchMatch = !filters.search || 
      student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.rollno.toLowerCase().includes(filters.search.toLowerCase());
    
    const genderMatch = !filters.gender || student.gender.toLowerCase() === filters.gender.toLowerCase();
    
    const departmentMatch = !filters.department || student.department.toLowerCase() === filters.department.toLowerCase();
    
    return searchMatch && genderMatch && departmentMatch;
  });
};
