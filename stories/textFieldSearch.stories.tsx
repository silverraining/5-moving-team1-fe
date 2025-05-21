import { useSearch } from "@/src/hooks/utill";
import TextField from "@/src/components/shared/components/text-field";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "TextField",
  component: TextField.Search,
  argTypes: {
    debounceTime: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "디바운스 딜레이 (밀리초 단위)",
      defaultValue: 500,
    },
    variation: {
      control: { type: "radio" },
      options: ["left", "right"],
      defaultValue: "left",
    },
  },
};
export default meta;
type SearchProps = React.ComponentProps<typeof TextField.Search>;

type TextFieldSearchProps = SearchProps & {
  debounceTime: number;
};

export const Search: StoryObj<TextFieldSearchProps> = {
  render: ({ debounceTime, variation }) => {
    const { value, debouncedValue, onClear, onChange } = useSearch(
      "",
      debounceTime
    );

    return (
      <>
        <TextField.Search
          variation={variation}
          value={value}
          onChange={onChange}
          onClick={onClear}
        />
        <div>debouncedValue: {debouncedValue}</div>
      </>
    );
  },
  args: {
    debounceTime: 500,
    variation: "left",
  },
};
