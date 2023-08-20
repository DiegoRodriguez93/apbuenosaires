// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://course-dashboard.onrender.com';

export const APTO_ENDPOINTS = {
  GET_SCHEDULE_DATES: `${BASE_URL}/get-schedule-dates`, // GET
  SAVE_SCHEDULE_DATE: `${BASE_URL}/save-schedule-date`, // POST
  CREATE_RESERVATION: `${BASE_URL}/create-reservation`, // POST
  DELETE_SCHEDULE_DATE: (id: string) => `${BASE_URL}/apto-schedule-date/${id}`, // DELETE
};
