"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Sidebar() {
  const params = useParams();
  const pathname = usePathname();

  const navItems = [
    {
      title: "ساختن پروژه",
      data: [
        {
          id: "projects-dash",
          label: "🏦 پروژه‌ها",
          href: "/dashboard/projects",
          disabled: false,
        },
        {
          id: "project-dash",
          label: "🏢 پروژه‌",
          href: `/dashboard/projects/${params.projectId}`,
          disabled: true,
        },
        {
          id: "floor-dash",
          label: "📲 طبقه",
          href: `/dashboard/projects/${params.projectId}/${params.floorId}`,
          disabled: true,
        },
      ],
    },
    {
      title: "منوی محاسبات",
      data: [
        {
          id: "potential-risk",
          label: "🎯 ریسک بالقوه (P)",
          href: `/dashboard/projects/${params.projectId}/${params.floorId}/potential-risk`,
          disabled: true,
        },
        {
          id: "acceptable-risk",
          label: "✅ سطح پذیرش (A)",
          href: `/dashboard/projects/${params.projectId}/${params.floorId}/acceptable-risk`,
          disabled: true,
        },
        {
          id: "protection-level",
          label: "🛡️ سطح حفاظت (D)",
          href: `/dashboard/projects/${params.projectId}/${params.floorId}/protection-level`,
          disabled: true,
        },
        {
          id: "initial-risk",
          label: "🎯 ریسک اولیه (R₀)",
          href: `/dashboard/projects/${params.projectId}/${params.floorId}/initial-risk`,
          disabled: true,
        },
      ],
    },
    {
      title: "منوی نتایج پروژه‌",
      data: [
        {
          id: "final-risk",
          label: "📊 محاسبه نهایی ریسک",
          href: `/dashboard/projects/${params.projectId}/final-risk`,
          disabled: true,
        },
        {
          id: "report",
          label: "📄 گزارش نهایی",
          href: `/dashboard/projects/${params.projectId}/final-report`,
          disabled: true,
        },
      ],
    },
  ];

  const enhancedNavItems = navItems.map((section) => {
    return {
      ...section,
      data: section.data.map((item) => {
        let isDisabled = item.disabled;

        // If current page = item.href → always enable it
        if (pathname === item.href) isDisabled = false;

        // If on project page → enable final results
        if (
          pathname === `/dashboard/projects/${params.projectId}` ||
          pathname.includes("final-risk") ||
          pathname.includes("final-report")
        ) {
          if (
            item.id === "final-risk" ||
            item.id === "report" ||
            item.id === "project-dash"
          ) {
            isDisabled = false;
          }
        }

        // If on floor page → enable all menu calculations
        if (
          pathname ===
            `/dashboard/projects/${params.projectId}/${params.floorId}` ||
          pathname.includes("potential-risk") ||
          pathname.includes("acceptable-risk") ||
          pathname.includes("protection-level") ||
          pathname.includes("initial-risk")
        ) {
          isDisabled = false;
        }

        return { ...item, disabled: isDisabled };
      }),
    };
  });

  return (
    <aside className="sidebar bg-card-bg rounded-xl p-6 h-fit border border-border-color top-[90px] lg:sticky">
      <div>
        {enhancedNavItems.map((items, i) => (
          <div key={i}>
            <h3 className="text-primary mb-6 text-xl font-semibold pb-3 border-b-2 border-primary">
              {items.title}
            </h3>
            <nav className="space-y-2">
              {items.data.map((item) =>
                item.disabled ? (
                  <div
                    key={item.id}
                    className={`py-3 px-4 my-2 rounded-lg bg-gray-50 text-gray-200 dark:bg-[#7c879775] dark:text-gray-400 font-medium cursor-not-allowed text-nowrap`}
                  >
                    {item.label}
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      `nav-item text-nowrap`,
                      pathname == item.href && "active bg-primary text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
