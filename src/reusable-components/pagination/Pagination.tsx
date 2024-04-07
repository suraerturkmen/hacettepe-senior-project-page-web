/*
 * Copyright 2018-2024 Commencis. All Rights Reserved.
 *
 * Save to the extent permitted by law, you may not use, copy, modify,
 * distribute or create derivative works of this material or any part
 * of it without the prior written consent of Commencis.
 * Any reproduction of this material must contain this notice.
 */

import { useMemo } from "react";
import { PaginationItemProps } from "@mui/material";
import * as S from "@/reusable-components/pagination/Pagination.styles";

const FIRST_INDEX = 1;

enum PaginationItemType {
  FIRST = "first",
  LAST = "last",
  PREVIOUS = "previous",
  NEXT = "next",
  PAGE = "page",
}

interface Props {
  itemCountPerPage: number;
  currentPage: number;
  totalCount: number;
  onChange: (currentPage: number, startIndex: number, endIndex: number) => void;
}

const Pagination = (props: Props): JSX.Element => {
  const { itemCountPerPage, currentPage, totalCount, onChange } = props;

  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / itemCountPerPage),
    [totalCount, itemCountPerPage]
  );

  const calculateIndexes = (page: number) => ({
    startIndex: (page - 1) * itemCountPerPage,
    endIndex:
      page * itemCountPerPage > totalCount
        ? totalCount
        : page * itemCountPerPage,
  });

  const handleOnChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const { startIndex, endIndex } = calculateIndexes(page);
    onChange(page, startIndex, endIndex);
  };

  const renderPaginationItem = (item: PaginationItemProps) => {
    if (
      item.type === PaginationItemType.FIRST ||
      item.type === PaginationItemType.LAST ||
      item.type === PaginationItemType.NEXT ||
      item.type === PaginationItemType.PREVIOUS
    ) {
      return (
        <S.StyledPaginationItem
          //   slots={{
          //     previous: ChevronLeftIcon,
          //     next: ChevronRightIcon,
          //     first: ChevronFirstIcon,
          //     last: ChevronLastIcon,
          //   }}
          className={item.type}
          {...item}
        />
      );
    }
    if (item.type === PaginationItemType.PAGE) {
      if (
        currentPage === FIRST_INDEX &&
        (item.page === currentPage ||
          item.page === currentPage + 1 ||
          item.page === currentPage + 2)
      ) {
        return <S.StyledPaginationItem {...item} />;
      }
      if (
        currentPage === totalPageCount &&
        (item.page === currentPage ||
          item.page === currentPage - 1 ||
          item.page === currentPage - 2)
      ) {
        return <S.StyledPaginationItem {...item} />;
      }
      if (
        item.page === currentPage - 1 ||
        item.page === currentPage ||
        item.page === currentPage + 1
      ) {
        return <S.StyledPaginationItem {...item} />;
      }
    }
    return null;
  };

  return (
    <S.StyledWrapper>
      <S.StyledContainer>
        <S.StyledPagination
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          count={totalPageCount}
          page={currentPage}
          onChange={handleOnChange}
          renderItem={renderPaginationItem}
        />
      </S.StyledContainer>
    </S.StyledWrapper>
  );
};

export default Pagination;
