import HomeClient from "./home-client";
import { isSensitive, computeResult } from "./lib/probability";

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q;

  if (!q || isSensitive(q)) {
    return {
      title: "whatoddly — 그 일이 일어날 확률",
      description:
        "궁금한 상황을 문장으로 입력하면 그 일이 일어날 확률을 재미있게 알려드려요.",
    };
  }

  const r = computeResult(q);
  const ogImageUrl = `/api/og?q=${encodeURIComponent(q)}&p=${encodeURIComponent(
    r.percent
  )}&c=${encodeURIComponent(r.category.label)}`;

  return {
    title: `"${q}" 확률은 ${r.percent}% | whatoddly`,
    description: `${r.reason} whatoddly에서 확인해보세요.`,
    openGraph: {
      title: `"${q}" 확률은 ${r.percent}%`,
      description: r.reason,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
  };
}

export default function Page({ searchParams }) {
  return <HomeClient initialQuery={searchParams?.q || ""} />;
}
