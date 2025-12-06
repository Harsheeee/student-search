import { supabase } from '@/lib/supabase';
import { Student } from '@/types/student';

export async function loadAllStudents(batchSize = 1000): Promise<Student[]> {
  let page = 0;
  let all: Student[] = [];

  while (true) {
    const from = page * batchSize;
    const to = from + batchSize - 1;

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .range(from, to);

    if (error) {
      console.error('Supabase batch fetch error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      break; // no more rows
    }

    all = all.concat(data);

    // If fewer than batchSize returned → last batch
    if (data.length < batchSize) {
      break;
    }

    page++;
  }

  return all;
}
