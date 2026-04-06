import {
  Target,
  Search,
  Zap,
  BookOpen,
  Code2,
  Shield,
  RefreshCw,
  CheckCircle,
  ClipboardList,
  Layers,
  GitBranch,
  Terminal,
  MessageSquare,
  Lightbulb,
  Rocket,
  BarChart3,
  FileText,
  Settings,
  Wrench,
  Bot,
  Repeat,
  Clapperboard,
  Microscope,
  Map,
  Clock,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  search: Search,
  zap: Zap,
  book: BookOpen,
  code: Code2,
  shield: Shield,
  refresh: RefreshCw,
  check: CheckCircle,
  clipboard: ClipboardList,
  layers: Layers,
  git: GitBranch,
  terminal: Terminal,
  message: MessageSquare,
  lightbulb: Lightbulb,
  rocket: Rocket,
  chart: BarChart3,
  file: FileText,
  settings: Settings,
  wrench: Wrench,
  bot: Bot,
  repeat: Repeat,
  clapperboard: Clapperboard,
  microscope: Microscope,
  map: Map,
  clock: Clock,
};

interface HeadingIconProps {
  icon: keyof typeof iconMap;
  size?: number;
  color?: string;
  className?: string;
}

export default function HeadingIcon({ icon, size = 20, color, className = "" }: HeadingIconProps) {
  const IconComponent = iconMap[icon];
  if (!IconComponent) return null;

  return (
    <IconComponent
      size={size}
      className={className}
      style={{ color, flexShrink: 0 }}
      strokeWidth={2}
    />
  );
}
