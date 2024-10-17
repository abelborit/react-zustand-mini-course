import { CardReposGithub } from "../../components/reactQuery/CardReposGithub";
import { useFetchRepositories } from "../../hooks/useReposGithub";

export const ReactQueryPage = () => {
  const { data, isLoading } = useFetchRepositories();
  // console.log({ data });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>React Query - Zustand</h1>
      <p>Gestor de estados para peticiones que vienen desde el servidor</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((element) => (
          <CardReposGithub repository={element} />
        ))}
      </div>
    </>
  );
};
