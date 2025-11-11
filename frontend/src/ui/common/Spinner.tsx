/** @format */

interface SpinnerAndErr {
  isLoading: boolean;
  isError?: boolean;
}

function Spinner() {
  return <p>Loading...</p>;
}

function Error() {
  return <p>Something went wrong...</p>;
}

function LoadAndErr({ isLoading = false, isError = false }: SpinnerAndErr) {
  if (isLoading) return <Spinner></Spinner>;

  if (isError) return <Error></Error>;
}

export default LoadAndErr;
