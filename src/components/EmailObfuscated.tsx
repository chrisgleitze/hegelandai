const emailUser = 'connectingdotscoding'
const emailDomain = 'gmail.com'
const email = `${emailUser}@${emailDomain}`

export default function EmailObfuscated() {
  return (
    <>
      <a href={`mailto:${email}`} className="text-teal-500 underline">
        {email}
      </a>
      <noscript>
        <span className="italic text-zinc-500">
          Email hidden for spam protection. Please enable JavaScript to view.
        </span>
      </noscript>
    </>
  )
}
