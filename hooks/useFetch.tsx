import axios from "axios";
import { useEffect, useState } from "react";

interface DataType {
  id: number;
  name: string;
  username: string;
  email: string;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const result = await response.data.data;
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, setData, loading, refetch };
};

export default useFetch;
