import { api } from "./api"

export const gqlr = async <T>(query: string, variables?: any): Promise<T> => {
  const response = await api.post("/graphql", {
    query,
    variables
  })
  return response.data
}