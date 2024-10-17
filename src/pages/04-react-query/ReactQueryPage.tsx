import { CardReposGithub } from "../../components/reactQuery/CardReposGithub";
import { useFetchRepositories } from "../../hooks/useReposGithub";
import { useFavoriteReposGithubStore } from "../../stores/favoriteReposGithub/favoriteReposGithub.store";

export const ReactQueryPage = () => {
  const { data, isLoading } = useFetchRepositories();
  // console.log({ data });

  const favoriteReposGithub = useFavoriteReposGithubStore(
    (state) => state.favoriteReposIds
  );
  // console.log(favoriteReposGithub);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>React Query - Zustand</h1>
      <p>Gestor de estados para peticiones que vienen desde el servidor</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((repository) => (
          <CardReposGithub
            key={repository.id}
            repository={repository}
            isFavorite={favoriteReposGithub.includes(repository.id)} // dará un true o un false
          />
        ))}
      </div>
    </>
  );
};
