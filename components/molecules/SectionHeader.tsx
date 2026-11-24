import DrawLine from "@/components/atoms/DrawLine";
import Text from "@/components/atoms/Text";
import SplitHeading from "@/components/molecules/SplitHeading";

type SectionHeaderProps = {
  lines: [string, string];
  description?: string;
};

export default function SectionHeader({ lines, description }: SectionHeaderProps) {
  return (
    <header className="mb-14">
      <DrawLine className="mb-10" />
      <SplitHeading lines={lines} />
      {description && (
        <Text variant="muted" className="mt-6 max-w-md">
          {description}
        </Text>
      )}
    </header>
  );
}
