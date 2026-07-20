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
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-2">
        <h1 className="label">Contact</h1>
        <p className="mt-4 max-w-[24ch] text-[13px] text-[color:var(--muted)]">
          Available for commissions.
        </p>
      </div>

      <div className="lg:col-span-6 lg:col-start-4">
        <ul className="border-t border-[color:var(--rule)]">
          {CONTACT_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="row flex items-baseline justify-between gap-8 border-b border-[color:var(--rule)] py-3"
              >
                <span className="row-title text-[15px] sm:text-[17px]">
                  {item.value}
                </span>
                <span className="label shrink-0">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
