import Head from "next/head"
import Link from "next/link"
import fetch from "node-fetch"

export async function getStaticProps() {
  const prod = process.env.NODE_ENV === "production"
  const API_URL = prod ? "https://jsonplaceholder.typicode.com/posts" : "https://jsonplaceholder.typicode.com/posts"
  const res = await fetch(`${API_URL}`)
  const hankyo = await res.json()
  return { props: { hankyo }}
}

export default function Home({hankyo}) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {hankyo.map((post) => (
          <li key={`${post.id}`}>
            <Link href="/[id]" as={`/${post.id}/`}><a>{post.title}</a></Link>
          </li>
        ))}
      </div>
      <form name="contact" method="POST" encType="application/x-www-form-urlencoded" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>Your Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  )
}
