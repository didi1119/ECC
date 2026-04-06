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
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10"
              style={{
                backgroundColor: step.color ? `${step.color}20` : "rgba(88,166,255,0.15)",
                border: `2px solid ${step.color || "#58a6ff"}`,
                color: step.color || "#58a6ff",
              }}
            >
              {step.number}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 h-8 mt-1" style={{ backgroundColor: "#30363d" }} />
            )}
          </div>

          {/* Content */}
          <div className="pb-6 flex-1 min-w-0">
            <div className="font-semibold mb-1" style={{ color: "#e6edf3" }}>{step.title}</div>
            <div className="text-sm mb-2" style={{ color: "#8b949e" }}>{step.description}</div>
            {step.command && (
              <code
                className="inline-block px-3 py-1 rounded text-xs font-mono"
                style={{ backgroundColor: "#161b22", border: "1px solid #30363d", color: "#58a6ff" }}
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
