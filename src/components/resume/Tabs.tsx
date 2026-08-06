interface Props {
  active: string;
  setActive: (tab: string) => void;
}

const tabs = [
  "Personal",
  "Summary",
  "Experience",
  "Projects",
  "Education",
  "Skills",
  "Certifications",
];

export default function Tabs({ active, setActive }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`rounded-lg px-4 py-2 whitespace-nowrap transition
          ${
            active === tab
              ? "bg-violet-600 text-white"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
