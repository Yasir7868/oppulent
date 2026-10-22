export default function Loading() {
  return (
    <div role="status" className="container-x flex min-h-[60vh] items-center justify-center">
      <span className="spin size-9 rounded-full border-2 border-line-4 border-t-cyan" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
