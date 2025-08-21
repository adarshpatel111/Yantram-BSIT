import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageLimitSelectorProps {
  limit: number;
  setLimit: (val: number) => void;
}

const PageLimitSelector: React.FC<PageLimitSelectorProps> = ({
  limit,
  setLimit,
}) => {
  const pageLimitOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];

  return (
    <Select
      value={limit.toString()}
      onValueChange={(val) => setLimit(Number(val))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select records per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Records per page</SelectLabel>
          {pageLimitOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value.toString()}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PageLimitSelector;
