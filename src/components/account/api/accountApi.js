import { apiClient } from '../../../shared/api/apiClient.js'

export async function getCurrentProfile() {
  return apiClient('/profile/')
}

export async function getReadingHistory() {
  return apiClient('/reading/reading-history/')
}
