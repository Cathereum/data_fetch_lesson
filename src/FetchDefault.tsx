// const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

// ============== ВАРИАНТ ЧИСТО ПОЛУЧИТЬ И ВЫВЕСТИ ДАННЫЕ В КОНСОЛЬ (ТАК ДЕЛАТЬ НЕЛЬЗЯ)

// function App() {
//   const fetchData = async () => {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   };

//   fetchData();

//   return <div>hello world</div>;
// }

// export default App;

// ============== ВАРИАНТ ТАКОЙ КАК НАДО РАБОЧИЙ НО БЕЗ ТИПИЗАЦИИ ==============

// import { useEffect, useState } from "react";

// const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(url);
//       const data = await response.json();
//       setData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {!data && <p>loading</p>}
//       {data && (
//         <div>
//           <ul>
//             {data.map((el) => (
//               <li key={el.id}>{el.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

// ============== ВАРИАНТ КАК НАДО + ТИПИЗАЦИЯ СОСТОЯНИЯ ==============

// import { useEffect, useState } from "react";

// const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// function App() {
//   const [data, setData] = useState<Post[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(url);
//       const data = await response.json();
//       setData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {!data && <p>loading</p>}
//       {data && (
//         <div>
//           <ul>
//             {data.map((el) => (
//               <li key={el.id}>{el.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

// ============== ВАРИАНТ КАК НАДО + ТИПИЗАЦИЯ + ОБРАБОТКА ОШИБКИ ==============

// import { useEffect, useState } from "react";

// const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// function App() {
//   const [data, setData] = useState<Post[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {!data && <p>loading</p>}
//       {data && (
//         <div>
//           <ul>
//             {data.map((el) => (
//               <li key={el.id}>{el.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

// ============== ВАРИАНТ КАК НАДО + ТИПИЗАЦИЯ + ОБРАБОТКА ОШИБКИ ПРАВИЛЬНАЯ ==============

// import { useEffect, useState } from "react";

// const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// function App() {
//   const [data, setData] = useState<Post[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setError(null);
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Network response ERROR");
//         }
//         const data = await response.json() as Post[];
//         setData(data);
//       } catch (error) {
//         console.error(error);
//         setError("Fetching Data Error");
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       {!data && !error && <p>loading...</p>}
//       {error && <p>{error}</p>}
//       {data && (
//         <div>
//           <ul>
//             {data.map((el) => (
//               <li key={el.id}>{el.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

// ============== ВАРИАНТ SENIOR ( ВСЕ СДЕЛАНО ЧЕРЕЗ ОТДЕЛЬНЫЙ КАСТОМНЫЙ ХУК)  ==============

// import { useEffect, useState } from "react";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }
// function useQuery<T>(url: string): {
//   data: T | null;
//   error: string | null;
//   loading: boolean | null;
// } {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setError(null);
//       setLoading(true);
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Network response ERROR");
//         }
//         const data = (await response.json()) as T;
//         setData(data);
//       } catch (error) {
//         console.error(error);
//         setError("Fetching Data Error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, error, loading };
// }

// function App() {
//   const url = "https://jsonplaceholder.typicode.com/posts?userId=1";

//   const { data, error, loading } = useQuery<Post[]>(url);
//   return (
//     <>
//       {loading && <p>loading...</p>}
//       {error && <p>{error}</p>}
//       {data && (
//         <div>
//           <ul>
//             {data.map((el) => (
//               <li key={el.id}>{el.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }
