import { SUBJECTS, type SubjectKey } from "@/lib/site";

export function SubjectTag({ subject }: { subject: SubjectKey }) {
  const s = SUBJECTS[subject];
  return (
    <span
      className="inline-block rounded-sm px-2 py-0.5 text-xs font-bold text-white"
      style={{ background: s.color }}
    >
      {s.name}
    </span>
  );
}
