import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/40", className)} />
  );
}

export function LoadingSkeleton({
  rows = 5,
  cols = 4,
}: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {["r0", "r1", "r2", "r3", "r4"].slice(0, rows).map((k) => (
        <div key={k} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: cols are anonymous, index is only stable key
            <Skeleton key={`${k}-${j}`} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {["c0", "c1", "c2", "c3"].map((k) => (
        <CardSkeleton key={k} />
      ))}
    </div>
  );
}
