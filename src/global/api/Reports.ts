import api from "../services/api";
const ROUTE = "/reports";

export async function GetTopFive(start_date: string, end_date: string) {
    const token = localStorage.getItem('token');
    try {
        const response = await api.get(`${ROUTE}/topfive?start_date=${start_date}&end_date=${end_date}`,
        {
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
