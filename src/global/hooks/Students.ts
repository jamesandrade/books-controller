import api from "../services/api";
import { IStudent } from "../../components/interfaces/IStudent";
const ROUTE = "/students";

export async function GetAllStudents() {
  const token = localStorage.getItem('token');
  try {
    const response = await api.get(ROUTE, {
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

export async function PostStudent(data: IStudent) {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(ROUTE, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    })
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
