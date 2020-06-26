import Head from "next/head"
import Link from "next/link"
import fetch from "node-fetch"

export async function getStaticProps() {
  const prod = process.env.NODE_ENV === "production"
  const API_URL = prod ? "https://hankyo-api-dev.herokuapp.com/mies/projects/4507e0cd45f81c0a" : "http://localhost:4000/mies/projects/a6fe0829b6982816"
  const res = await fetch(`${API_URL}`)
  const hankyo = await res.json()

  // console.log(hankyo)

  return { props: { hankyo }}
}

export default function Home({hankyo}) {
  return (
    <div className="container">
      <Head>
        <title>{hankyo.project.meta_title || "Hankyo Next"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>{hankyo.project.title}</h1>
        <p>{hankyo.project.description}</p>
        {hankyo.project.blocks.map((block) => (
          <li key={`${block.id}`}>{block.title}</li>
        ))}
      </div>
    </div>
  )
}
