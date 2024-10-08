import type { FC } from 'preact/compat';

const Error: FC = () => {
  return (
    <div className="space-y-4 text-center p-3">
      <h1 id="i-am-error" className="text-white text-2xl max-sm:text-sm">I AM ERROR.</h1>
      <h3 id="something-went-wrong" className="text-white text-md max-sm:text-xs">Something has gone wrong.</h3>
      <h3 id="please-try-again" className="text-white text-md max-sm:text-xs">Please try again.</h3>
    </div>
  )
}

export default Error;