import HomeClient from "./home-client";

export default function Page({ searchParams }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  return <HomeClient initialQuery={q} />;
}
