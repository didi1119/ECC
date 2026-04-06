import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_COMMANDS, COMMANDS_BY_SLUG } from "../../data";
import CommandDetail from "../../components/CommandDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_COMMANDS.map((cmd) => ({ slug: cmd.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const command = COMMANDS_BY_SLUG[slug];
  if (!command) return {};
  return {
    title: `${command.name} — ECC 指令說明`,
    description: command.shortDesc,
  };
}

export default async function CommandPage({ params }: Props) {
  const { slug } = await params;
  const command = COMMANDS_BY_SLUG[slug];
  if (!command) notFound();

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-8">
          <Link href="/cheatsheet" className="hover:text-[var(--text-secondary)] transition-colors">
            速查表
          </Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{command.name}</span>
        </nav>

        {/* Detail */}
        <CommandDetail command={command} allCommands={ALL_COMMANDS} />

        {/* Back button */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/cheatsheet"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>←</span>
            <span>回到所有指令</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
