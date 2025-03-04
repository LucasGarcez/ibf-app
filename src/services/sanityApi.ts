import { ENV_SANITYCMS_DATASET, ENV_SANITYCMS_PROJECTID } from '@env'

import axios from 'axios'

export const sanityAPI = axios.create({
  baseURL: `https://${ENV_SANITYCMS_PROJECTID}.api.sanity.io/v2021-10-21/data/query/${ENV_SANITYCMS_DATASET}`,
})
