import { WhiteCard } from "../shared/cards/WhiteCard";
import { Repository } from "../../interfaces/github.interface";

interface PropsInterface {
  repository: Repository;
}

export const CardReposGithub = ({ repository }: PropsInterface) => {
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
    </WhiteCard>
  );
};
