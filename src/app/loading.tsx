export default function Loading() {
  return (
    <div role="status" className="flex min-h-[60dvh] items-center justify-center">
      <span
        aria-hidden="true"
        className="border-line border-t-marine-blue size-8 rounded-full border-2 motion-safe:animate-spin"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
