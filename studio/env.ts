function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var ${name}. Copy .env.example to .env.local.`)
  return value
}

export const projectId = required('SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID)
export const dataset = required('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET)
