import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
function useQuery<T>(url: string): {
  data: T | null;
  error: string | null;
  loading: boolean | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response ERROR");
        }
        const data = (await response.json()) as T;
        setData(data);
      } catch (error) {
        console.error(error);
        setError("Fetching Data Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}

function App() {
  const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

  const { data, error, loading } = useQuery<Post[]>(url);

  return (
    <>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <ul>
            {data.map((el) => (
              <li key={el.id}>{el.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
