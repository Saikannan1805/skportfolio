import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Saikannan Sathish Resume" },
};

export default function ResumePage() {
  return (
    <iframe
      src="/SaikannanSathish_Resume.pdf"
      className="fixed inset-0 h-full w-full border-0"
      title="Saikannan Sathish Resume"
    />
  );
}
