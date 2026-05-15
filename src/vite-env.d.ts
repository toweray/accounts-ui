interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  // more env variables...
}

// biome-ignore lint/correctness/noUnusedVariables: _
interface ImportMeta {
  readonly env: ImportMetaEnv
}
