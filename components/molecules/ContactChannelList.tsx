import Icon from "@/components/atoms/Icon";
import type { ContactChannel } from "@/data/contact";

export default function ContactChannelList({ channels }: { channels: ContactChannel[] }) {
  return (
    <ul className="grid content-start gap-5">
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 transition hover:opacity-70"
          >
            <Icon name={channel.icon} className="text-muted" />
            <span className="min-w-0">
              <span className="block text-sm text-muted">{channel.label}</span>
              <span className="block font-medium break-words">{channel.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
