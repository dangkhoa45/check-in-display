export type Employee = {
  name: string;
  employee: string;
  employee_name: string;
  first_name?: string;
  middle_name?: string | null;
  last_name?: string | null;
  gender?: "Male" | "Female" | string;
  date_of_birth?: string;
  date_of_joining?: string;
  status?: string;

  image?: string | null;
  custom_face_images1?: string | null;
  custom_face_images2?: string | null;
  custom_face_images3?: string | null;
  custom_face_images4?: string | null;
  custom_face_images5?: string | null;
  custom_face_images6?: string | null;

  company?: string;
  department?: string | null;
  designation?: string | null;
  branch?: string | null;

  user_id?: string | null;
  personal_email?: string | null;
  company_email?: string | null;
  cell_number?: string | null;

  date_of_retirement?: string;
  marital_status?: string;
  blood_group?: string;
  bio?: string | null;

  // system fields
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;

  // optional
  custom_employee_code?: string | null;
  holiday_list?: string | null;
  attendance_device_id?: string | null;
};
