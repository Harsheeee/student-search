import { Student } from '@/types/student';

// Safe normalization helper
const norm = (v: any) => {
  if (v === null || v === undefined) return '';
  return String(v).trim().toLowerCase();
};

export const filterStudents = (
  students: Student[],
  filters: { search: string; gender: string; department: string; batch: string }
) => {
  const q = norm(filters.search);
  const g = norm(filters.gender);
  const d = norm(filters.department);
  const b = norm(filters.batch);

  return students.filter((student) => {
    const name = norm(student.name);
    const rollno = norm(student.rollno);
    const gender = norm(student.gender);
    const dept = norm(student.department);
    const batch = norm(student.batch);

    const searchMatch =
      !q ||
      name.includes(q) ||
      rollno.includes(q);

    const genderMatch = !g || gender === g;
    const departmentMatch = !d || dept === d;
    const batchMatch = !b || batch === b;

    return searchMatch && genderMatch && departmentMatch && batchMatch;
  });
};
