export type CheckInOutEvent = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  employee: string;
  employee_name: string;
  log_type: "IN" | "OUT";
  shift: string;
  custom_image: string | null;
  custom_is_vest: 0 | 1;
  custom_is_gloves: 0 | 1;
  custom_is_boots: 0 | 1;
  time: string;
  device_id: string;
  skip_auto_attendance: 0 | 1;
  attendance: string | null;
  custom_late_by: number | null;
  custom_early_by: number | null;
  latitude: number;
  longitude: number;
  geolocation: any;
  shift_start: string | null;
  shift_end: string | null;
  offshift: 0 | 1;
  shift_actual_start: string | null;
  shift_actual_end: string | null;
};

export type CheckIn = {
  name: string;
  timestamp: string;
  camera_id: string;
  employee_id: string;
  employee_name: string;
  is_unknown: string;
  status: string;
  is_vest: 0 | 1;
  is_gloves: 0 | 1;
  is_boots: 0 | 1;
  skip_auto_attendance: 0 | 1;
  attendance: null;
  late_by: number;
  early_by: number;
  custom_image: string | "";
};

export const initialCheckIns: CheckInOutEvent[] = [];

export const newCheckIns: CheckInOutEvent[] = [];
