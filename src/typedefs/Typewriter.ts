interface TypewriterOptions {
  speed?: number;
}

interface TypewriterResult {
  duration: number;
  tick: (t: number) => void;
}

export type {
  TypewriterOptions,
  TypewriterResult
}