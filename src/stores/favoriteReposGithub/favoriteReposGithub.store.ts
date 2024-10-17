import { create } from "zustand";
import { persist } from "zustand/middleware";

interface favoriteRepoGithubState {
  favoriteReposIds: number[];

  addFavoriteRepo: (id: number) => void;
  removeFavoriteRepo: (id: number) => void;
}

export const useFavoriteReposGithubStore = create<favoriteRepoGithubState>()(
  persist(
    /* ********** */
    (set) => ({
      favoriteReposIds: [],

      addFavoriteRepo: (id: number) =>
        set((state) => ({ favoriteReposIds: [...state.favoriteReposIds, id] })),

      removeFavoriteRepo: (id: number) =>
        set((state) => ({
          favoriteReposIds: state.favoriteReposIds.filter(
            (repoId) => repoId !== id
          ),
        })),
    }),
    /* ********** */
    {
      name: "favorite-repos-github",
    }
  )
);
