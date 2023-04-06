import { ILoan } from "../../components/interfaces/ILoan";
import api from "../services/api";
const ROUTE = "/loans";

export async function GetAllLoans() {
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

export async function PostLoan(data: ILoan) {
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
