import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useFilterModal } from "@/src/hooks/utill";
import FilterModal from "@/src/components/shared/components/modal/FilterModal";
import { Button } from "@mui/material";

const meta: Meta<typeof FilterModal> = {
  title: "Modal",
  component: FilterModal,
  parameters: {
    docs: {
      description: {
        component: "이사 유형 필터를 위한 모달 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    onClose: { action: "close modal" },
    onAllChange: { action: "전체선택 클릭" },
    onIndividualChange: { action: "개별체크 클릭" },
    onSubmit: { action: "조회하기 버튼 클릭" },
  },
};

export default meta;

type Story = StoryObj<typeof FilterModal>;

export const Filter: Story = {
  render: (args) => {
    const {
      open,
      openModal,
      closeModal,
      checked,
      indeterminate,
      handleAllChange,
      handleIndividualChange,
      handleSubmitFilters,
    } = useFilterModal();

    const test = { all: 40, home: 20, small: 10, office: 10 };

    return (
      <>
        <Button variant="contained" onClick={openModal}>
          필터 열기
        </Button>
        <FilterModal
          {...args}
          open={open}
          onClose={(...e) => {
            args.onClose?.(...e);
            closeModal();
          }}
          count={test}
          checked={checked}
          indeterminate={indeterminate}
          onAllChange={(value) => {
            args.onAllChange?.(value);
            handleAllChange(value);
          }}
          onIndividualChange={(key, value) => {
            args.onIndividualChange?.(key, value);
            handleIndividualChange(key, value);
          }}
          onSubmit={(...e) => {
            args.onSubmit?.(...e);
            handleSubmitFilters();
          }}
        />
      </>
    );
  },
};
