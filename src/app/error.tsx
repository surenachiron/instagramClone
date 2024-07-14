'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong, Please check your internet connection.!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
