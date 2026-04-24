import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { ContactTerminalForm } from "@/components/organisms/ContactTerminalForm";
import { ContactCopy } from "./types";
import { renderMetadataLabel } from "./utils";

export function ContactSection({ copy }: { copy: ContactCopy }) {
  return (
    <section
      className="flex flex-col items-center bg-surface-container-lowest px-8 py-32 text-center scroll-mt-28 md:px-16"
      id="contact"
    >
      <div className="w-full max-w-2xl">
        <ShellSectionHeader
          sourceLabel={renderMetadataLabel(copy.eyebrow)}
          title={copy.title}
          alias="// initiate terminal handshake"
        />
        <div className="mt-8">
          <ShellPanel label="[CONTACT_PROTOCOL]" tone="accent">
            <p className="text-lg mb-8 font-body text-zinc-400">
              {copy.description}
            </p>
            <ContactTerminalForm copy={copy.form} />
          </ShellPanel>
        </div>
      </div>
    </section>
  );
}
