export interface Suggestion {
  active: boolean;
  description: string;
  formattedSuggestion: FormattedSuggestion;
  id: string;
  index: number;
  matchedSubstrings: MatchedSubstring[];
  placeId: string;
  terms: Term[];
  types: string[];
}

export interface FormattedSuggestion {
  mainText: string;
  secondaryText: string;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface Term {
  offset: number;
  value: string;
}
