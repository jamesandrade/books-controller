import api from "../services/api";
import { IBook } from "../../components/interfaces/IBook";
const ROUTE = "/books";

export async function GetAllBooks() {
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

export async function PostBook(data: IBook) {
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
