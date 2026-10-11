import { useGetTeam } from "../hooks/useQueries";

export default function Team() {
  const { data: team = [] } = useGetTeam();

  return (
    <section id="team" className="bg-sand py-16 md:py-24">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-4xl font-medium tracking-tight">
            The chairs behind it
          </h2>
          <p className="mt-4 text-lg text-cocoa">
            A small team, on purpose. You'll see the same faces every visit.
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <li
              key={member.id.toString()}
              className="rounded-2xl bg-cream p-6 shadow-sm"
            >
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <h3 className="mt-5 font-serif text-xl font-medium">
                {member.name}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-clay">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
