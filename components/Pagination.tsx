"use client";

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {formUrlQuery} from "@/lib/utils";

type PaginationProps = {
  page: number,
  totalPages: number,
  urlParamName?: string
}

const Pagination = ({page, totalPages, urlParamName}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleButtonClick = (btnType: string) => {
    const pageNumber = btnType === "prev" ? page - 1 : page + 1;
    const newURL = formUrlQuery({params: searchParams.toString(), key: urlParamName || "page", value: pageNumber.toString()});

    router.push(newURL, {scroll: false});
  }

  return (
      <div className="flex gap-2">
        <Button size="lg" variant="outline" className="w-28" onClick={() => handleButtonClick("prev")} disabled={Number(page) <= 1}>Previous</Button>
        <Button size="lg" variant="outline" className="w-28" onClick={() => handleButtonClick("next")} disabled={Number(page) >= totalPages}>Next</Button>
      </div>
  );
};

export default Pagination;
