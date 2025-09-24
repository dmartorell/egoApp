export interface User {
  id: string;
  name: string;
  email: string;
}

export type AnalysisResult = {
  suggestions: string[];
  metrics: Record<string, number>;
};
