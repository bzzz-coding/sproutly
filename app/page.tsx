import Link from "next/link";

export default function Page() {
  return (
    <div className="hero min-h-[calc(100vh-128px)] overflow-auto">
      <div className="hero-content min-h-[calc(100vh-128px)] overflow-auto text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-10 text-5xl font-bold">Growing Guide</h1>
          <div className="flex flex-row justify-center gap-4">
            <p className="btn btn-success">
              <Link href="/frost-lookup">Frost Date Lookup</Link>
            </p>
            <p className="btn btn-secondary">
              <Link href="/date-calculator">Gardening Planner</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
