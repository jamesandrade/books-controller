import api from "../services/api";
const ROUTE = "/loans";

export async function GetAllStudentsWithLoan() {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get(`${ROUTE}/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
}

export async function GetBooksOfStudent(ra) {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get(`${ROUTE}/students/${ra}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
}