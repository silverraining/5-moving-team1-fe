// shared/components/Pagination.stories.tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Pagination from "@/shared/pagination/Pagination";

// 스토리북 메타 정의
const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ✅ 상태를 관리하기 위한 Wrapper 컴포넌트
const PaginationTemplate = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

// 기본 예시
export const Default: Story = {
  render: () => <PaginationTemplate totalPages={10} />,
};
