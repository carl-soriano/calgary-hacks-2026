/**
 * Entry from the AI vs Real image dataset.
 * Use this type when loading from a JSON/API dataset in the future.
 */
export interface DatasetImage {
  id: string
  src: string
  isAI: boolean
  /** Optional: source or license info */
  source?: string
  /** Optional: tags or categories for filtering */
  tags?: string[]
}
