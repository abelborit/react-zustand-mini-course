import { WhiteCard } from "../shared/cards/WhiteCard";
import { Repository } from "../../interfaces/github.interface";
import { useFavoriteReposGithubStore } from "../../stores/favoriteReposGithub/favoriteReposGithub.store";

interface PropsInterface {
  repository: Repository;
  isFavorite: boolean;
}

export const CardReposGithub = ({ repository, isFavorite }: PropsInterface) => {
  const addFavoriteRepo = useFavoriteReposGithubStore(
    (state) => state.addFavoriteRepo
  );

  const removeFavoriteRepo = useFavoriteReposGithubStore(
    (state) => state.removeFavoriteRepo
  );

  const handleToggleFavorite = () => {
    isFavorite
      ? removeFavoriteRepo(repository.id)
      : addFavoriteRepo(repository.id);
  };

  return (
    <WhiteCard centered>
      <h2>{repository.name}</h2>
      <br />

      <p className="font-bold">
        Created:{" "}
        <span className="font-normal">
          {JSON.stringify(repository.created_at, null, 2)}
        </span>
      </p>

      <p className="font-bold">
        Default Branch:{" "}
        <span className="font-normal">{repository.default_branch}</span>
      </p>
      <br />

      <button onClick={handleToggleFavorite}>
        {isFavorite ? "Dislike" : "Like"}
      </button>
    </WhiteCard>
  );
};
