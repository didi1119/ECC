import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { ALL_COMMANDS, COMMANDS_BY_SLUG } from "../../data";
import CommandDetail from "../../components/CommandDetail";
import Navbar from "../../../components/Navbar";

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
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <main className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-8" style={{ color: "var(--text-tertiary)" }}>
            <Link
              href="/cheatsheet"
              className="hover:text-[var(--text-primary)] transition-colors px-1.5 py-0.5 rounded"
              style={{ color: "var(--text-secondary)" }}
            >
              速查表
            </Link>
            <ChevronRight size={14} style={{ color: "var(--text-tertiary)" }} />
            <span style={{ color: "var(--text-primary)" }}>{command.name}</span>
          </nav>

          {/* Detail */}
          <CommandDetail command={command} allCommands={ALL_COMMANDS} />

          {/* Back button */}
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <Link
              href="/cheatsheet"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all nav-link"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-medium)",
                color: "var(--text-secondary)",
              }}
            >
              <ArrowLeft size={16} />
              <span>回到所有指令</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
