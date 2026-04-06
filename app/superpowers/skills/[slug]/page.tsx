import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import { ALL_SKILLS, SKILLS_BY_SLUG } from "../../data";
import SkillDetail from "../../components/SkillDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_SKILLS.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const skill = SKILLS_BY_SLUG[slug];
  if (!skill) return {};
  return {
    title: `${skill.name} — Superpowers 技能說明`,
    description: skill.shortDesc,
  };
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const skill = SKILLS_BY_SLUG[slug];
  if (!skill) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <main className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm mb-8"
            style={{ color: "var(--text-tertiary)" }}
          >
            <Link
              href="/superpowers"
              className="hover:text-[var(--text-primary)] transition-colors px-1.5 py-0.5 rounded"
              style={{ color: "var(--text-secondary)" }}
            >
              Superpowers
            </Link>
            <ChevronRight size={14} style={{ color: "var(--text-tertiary)" }} />
            <span style={{ color: "var(--text-primary)" }}>
              {skill.displayName}
            </span>
          </nav>

          {/* Detail */}
          <SkillDetail skill={skill} allSkills={ALL_SKILLS} />

          {/* Back button */}
          <div
            className="mt-12 pt-8"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <Link
              href="/superpowers"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all nav-link"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-medium)",
                color: "var(--text-secondary)",
              }}
            >
              <ArrowLeft size={16} />
              <span>回到所有技能</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
