import {defineCliConfig, getStudioEnvironmentVariables} from 'sanity/cli'

// The CLI config loads before .env files, so read them explicitly (.env, .env.local, .env.<mode>).
const env = getStudioEnvironmentVariables({
  envFile: {mode: process.env.NODE_ENV ?? 'development'},
})

function required(name: string): string {
  const value = env[name]
  if (!value) throw new Error(`Missing env var ${name}. Copy .env.example to .env.local.`)
  return value
}

export default defineCliConfig({
  api: {
    projectId: required('SANITY_STUDIO_PROJECT_ID'),
    dataset: required('SANITY_STUDIO_DATASET'),
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
