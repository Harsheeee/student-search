export interface Student {
  name: string;
  rollno: string;
  username: string;
  program: string;
  department: string;
  hall: string;
  room: string;
  gender: string;
  bloodgroup: string;
  photo: string;
  batch: string;
}

export interface FilterState {
  search: string;
  gender: string;
  department: string;
  batch: string;
}