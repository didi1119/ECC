interface Step {
  number: number;
  title: string;
  description: string;
  command?: string;
  color?: string;
}

interface StepFlowProps {
  steps: Step[];
}

export default function StepFlow({ steps }: StepFlowProps) {
  return (
    <div className="space-y-0 relative">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10"
              style={{
                backgroundColor: step.color ? `${step.color}20` : "rgba(96,165,250,0.15)",
                border: `2px solid ${step.color || "var(--accent-blue)"}`,
                color: step.color || "var(--accent-blue)",
              }}
            >
              {step.number}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 mt-1 min-h-[2rem]" style={{ backgroundColor: "var(--border-medium)" }} />
            )}
          </div>

          {/* Content */}
          <div className="pb-6 flex-1 min-w-0">
            <div className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{step.title}</div>
            <div className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>{step.description}</div>
            {step.command && (
              <code
                className="inline-block px-3 py-1 rounded text-xs font-mono"
                style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)", color: "var(--accent-blue)" }}
              >
                {step.command}
              </code>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
