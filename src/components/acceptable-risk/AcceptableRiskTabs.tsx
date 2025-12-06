"use client";

interface Tab {
  id: string;
  label: string;
}

interface AcceptableRiskTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function AcceptableRiskTabs({
  tabs,
  activeTab,
  onTabChange,
}: AcceptableRiskTabsProps) {
  return (
    <div className="tabs flex gap-0 mb-8 border-b-2 border-gray-200 dark:border-gray-800 justify-between overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab text-sm px-2 dark:text-gray-400 ${
            activeTab === tab.id
              ? "active text-primary dark:text-primary"
              : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

