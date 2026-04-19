"use client";

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  tone: "success" | "error" | "info";
  timestamp: string;
};

type TransactionListProps = {
  items: ActivityItem[];
};

const toneClasses: Record<ActivityItem["tone"], string> = {
  success:
    "border-[#bce7d5] bg-[#edf9f3] text-[#1a5a40] dark:border-[#315849] dark:bg-[#10261c] dark:text-[#bce7d5]",
  error:
    "border-[#f7c4cd] bg-[#fff0f2] text-[#a33a51] dark:border-[#5f2632] dark:bg-[#2b1218] dark:text-[#ffbecd]",
  info: "border-[#f8b4c6]/50 bg-white text-[#6a4a56] dark:border-white/10 dark:bg-[#171717] dark:text-[#d5c9cd]",
};

export function TransactionList({ items }: TransactionListProps) {
  return (
    <section className="rounded-[34px] border border-white/80 bg-white/72 p-7 shadow-[0_18px_48px_rgba(244,114,158,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.22)] lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ec407a] dark:text-[#f8b4c6]">
            Activity
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] text-[#242124] dark:text-white">
            Recent
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <article
            key={item.id}
            className={`rounded-[24px] border px-5 py-5 ${toneClasses[item.tone]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6">
                  {item.description}
                </p>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em]">
                {item.timestamp}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
