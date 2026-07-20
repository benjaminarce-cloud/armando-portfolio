const CONTACT_LINKS = [
  { label: "Email", value: "armandirix@gmail.com", href: "mailto:armandirix@gmail.com" },
  { label: "Instagram", value: "@armandoaguilare", href: "https://instagram.com/armandoaguilare" },
  { label: "LinkedIn", value: "armandoaguilarr", href: "https://www.linkedin.com/in/armandoaguilarr/" },
  { label: "TikTok", value: "@armandoaguilarr", href: "https://www.tiktok.com/@armandoaguilarr" },
];

export const metadata = {
  title: "Contact — Armando Aguilar",
};

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="caps text-[color:var(--muted)]">Contact</p>

        <h1 className="display mt-6 text-[clamp(30px,4.4vw,54px)]">
          Let&apos;s talk.
        </h1>

        <p className="caps-sm mt-8 text-[color:var(--muted)]">
          Available for commissions worldwide
        </p>
      </div>

      <ul className="index mx-auto mt-20 max-w-3xl border-t border-[color:var(--rule)]">
        {CONTACT_LINKS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="row flex items-baseline justify-between gap-8 border-b border-[color:var(--rule)] py-6"
            >
              <span className="caps text-[color:var(--muted)]">
                {item.label}
              </span>
              <span className="index-title text-[13px] sm:text-[15px]">
                {item.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
