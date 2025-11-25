"use client";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const navItems = [
    {
      id: "potential-risk",
      label: "🎯 ریسک بالقوه (P)",
      href: "#potential-risk",
    },
    {
      id: "acceptable-risk",
      label: "✅ سطح پذیرش (A)",
      href: "#acceptable-risk",
    },
    {
      id: "protection-level",
      label: "🛡️ سطح حفاظت (D)",
      href: "#protection-level",
    },
    { id: "initial-risk", label: "🎯 ریسک اولیه (R₀)", href: "#initial-risk" },
    { id: "final-risk", label: "📊 محاسبه نهایی ریسک", href: "#final-risk" },
    { id: "report", label: "📄 گزارش نهایی", href: "#report" },
  ];

  return (
    <aside className="sidebar bg-card-bg rounded-xl p-6 h-fit top-28 border border-border-color lg:sticky">
      <h2 className="text-primary mb-6 text-xl font-semibold pb-3 border-b-2 border-primary">
        منوی محاسبات
      </h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
            className={`nav-item text-nowrap ${
              activeSection === item.id ? "active" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
