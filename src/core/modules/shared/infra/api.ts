import { _env } from "@/core/config/_env"
import axios from "axios"

export const api = axios.create({
  baseURL: _env.VITE_API_URL,
})