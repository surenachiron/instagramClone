'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="h-[200px] w-full flex flex-col items-center justify-center bg-white rounded-lg">
      <h3 className="text-xl text-bold text-black">Something went wrong, Please check your internet connection.!</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
