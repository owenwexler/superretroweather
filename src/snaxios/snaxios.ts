/*
 * SNAXIOS: a minimal one-file zero-dependency HTTP library that can serve as, not exactly a drop-in replacement, but a minimal-refactor alternative to Axios in most common use cases.  It is a minimal type-safe wrapper around the JavaScript/TypeScript fetch API that returns a similar data shape to Axios, but excludes some functionality.  Think of it as the Preact to Axios' React.
*/

import type { ErrorType, DataErrorReturnObject } from 'dataerror';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type SnaxiosFetchObject = {
  method: Method;
  headers: HeadersInit; 
  body?: BodyInit | null | undefined; 
  next?: { revalidate: number };
}

export type SnaxiosArgs = {
  method: Method;
  headers: HeadersInit; 
  body?: BodyInit | null | undefined; 
  params?: { [key: string]: unknown };
  nextRevalidateTime?: number;
}

interface SnaxiosReturnObject<T> extends DataErrorReturnObject<T> {
  status: number;
}

const snaxiosError = {
  code: 'snaxios_error',
  message: 'Snaxios Error',
  details: 'An error has occurred during a snaxios fetch',
  hint: 'Log the output of this fetch to see what is happening'
}

const isDEErrorType = (error: unknown): error is ErrorType => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error &&
    'hint' in error
  );
}

const hasStringMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

const checkHasMessage = (error: unknown): ErrorType => {
  return hasStringMessage(error)
    ?
      { ...snaxiosError, message: error.message }
    :
      snaxiosError;
}

const snaxiosCore = async <T>(url: string, args: SnaxiosArgs): Promise<SnaxiosReturnObject<T>> => {
  const { method, headers, body, params, nextRevalidateTime } = args;

  const typedParams = params ? params : {};

  let urlWithParams = url + '?';

  for (const key in typedParams) {
    if (typedParams.hasOwnProperty(key)) {
      urlWithParams += `${encodeURIComponent(key)}=${encodeURIComponent(String(typedParams[key]))}&`;
    }
  }

  const finalUrl = Object.keys(typedParams).length > 0 ? urlWithParams : url;

  const fetchObject: SnaxiosFetchObject =
    {
      method,
      body,
      headers
    };

  if (nextRevalidateTime) {
    fetchObject['next'] = { revalidate: Number(nextRevalidateTime) }
  }

  try {
    const response = await fetch(finalUrl, fetchObject)
    const result = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: isDEErrorType(result) ? result : checkHasMessage(result) // if the response body is a formatted return type with code/message/details/hint, just return it, otherwise, check to see if it has a message field and return the snaxios error object with the body's message replacing the generic snaxios error, or just the generic snaxios error object if no message attached
      } as SnaxiosReturnObject<T>;
    }

    return {
      status: response.status,
      data: result as T,
      error: null
    } as SnaxiosReturnObject<T>;
  } catch (error) {
    console.error(error);

    const status =
      typeof error === 'object' && error !== null && 'status' in error && typeof (error as { status: unknown }).status === 'number'
        ?
          (error as { status: number }).status
        :
          500;

    return {
      status,
      data: null,
      error: isDEErrorType(error) ? error : checkHasMessage(error) // if the error is a formatted return type with code/message/details/hint, just return it, otherwise, check to see if it has a message field and return the snaxios error object with the error's message replacing the generic snaxios error, or just the generic snaxios error object if no message attached
    } as SnaxiosReturnObject<T>;
  }
}

// method is supplied by each snaxios.<verb> method below, so callers never pass it directly
// headers and body are optional on each method so simple GETs can be written as snaxios.get<T>(url)
type SnaxiosMethodArgs = Partial<Omit<SnaxiosArgs, 'method'>>;

const withDefaults = (args: SnaxiosMethodArgs): Omit<SnaxiosArgs, 'method'> => ({
  headers: {},
  ...args
});

const snaxios = {
  get: <T>(url: string, args: SnaxiosMethodArgs = {}): Promise<SnaxiosReturnObject<T>> =>
    snaxiosCore<T>(url, { ...withDefaults(args), method: 'GET' }),
  post: <T>(url: string, args: SnaxiosMethodArgs = {}): Promise<SnaxiosReturnObject<T>> =>
    snaxiosCore<T>(url, { ...withDefaults(args), method: 'POST' }),
  put: <T>(url: string, args: SnaxiosMethodArgs = {}): Promise<SnaxiosReturnObject<T>> =>
    snaxiosCore<T>(url, { ...withDefaults(args), method: 'PUT' }),
  patch: <T>(url: string, args: SnaxiosMethodArgs = {}): Promise<SnaxiosReturnObject<T>> =>
    snaxiosCore<T>(url, { ...withDefaults(args), method: 'PATCH' }),
  delete: <T>(url: string, args: SnaxiosMethodArgs = {}): Promise<SnaxiosReturnObject<T>> =>
    snaxiosCore<T>(url, { ...withDefaults(args), method: 'DELETE' }),
};

export {
  snaxios
}

