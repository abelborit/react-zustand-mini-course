import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/github.api";
import { Repository } from "../interfaces/github.interface";

/* este hook será para hacer fetch y obtener los datos de los repositorios de github usando axios */
async function fetchReposGithub(context: QueryFunctionContext) {
  /* el "context.queryKey" sería el arreglo que se le está pasando, es decir, sería -- ["reposGithub", githubUser] -- */
  const [cacheNameData, githubUser] = context.queryKey;

  /* aquí en -- githubApi.get<.....>(.....) -- ya viene la baseURL que se colocó y aquí estamos concatenando lo demás de la url para obtener los repositorios según el usuario */
  const { data } = await githubApi.get<Repository[]>(
    `/users/${githubUser}/repos`
  );

  return data;
}

/* este hook será para usar React Query */
export function useFetchRepositories(githubUser: string) {
  /* el useQuery espera dos parámetros, el primero será un arreglo con el nombre de cómo guardaremos los datos en memoria cache y el segundo será la forma o la función la cual va a solicitar esos datos al servidor/backend */
  return useQuery(["reposGithub", githubUser], fetchReposGithub);
}
