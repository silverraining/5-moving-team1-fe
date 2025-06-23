import { useState, useCallback } from "react";
import { SORT_OPTIONS, OrderString } from "@/src/lib/constants";

export interface MoverFilterState {
  region: string;
  serviceType: string;
  sortBy: OrderString;
  searchKeyword: string;
}

export interface UseMoverFilterReturn {
  filters: MoverFilterState;
  setRegion: (region: string) => void;
  setServiceType: (serviceType: string) => void;
  setSortBy: (sortBy: OrderString) => void;
  setSearchKeyword: (keyword: string) => void;
  resetFilters: () => void;
  getFilterParams: () => {
    region?: string;
    serviceType?: string;
    sortBy: OrderString;
    searchKeyword?: string;
  };
}

const initialFilters: MoverFilterState = {
  region: "전체",
  serviceType: "전체",
  sortBy: SORT_OPTIONS[0].value,
  searchKeyword: "",
};

export const useMoverFilter = (): UseMoverFilterReturn => {
  const [filters, setFilters] = useState<MoverFilterState>(initialFilters);

  const setRegion = useCallback((region: string) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const setServiceType = useCallback((serviceType: string) => {
    setFilters((prev) => ({ ...prev, serviceType }));
  }, []);

  const setSortBy = useCallback((sortBy: OrderString) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const setSearchKeyword = useCallback((searchKeyword: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const getFilterParams = useCallback(() => {
    const params: any = {
      sortBy: filters.sortBy,
    };

    if (filters.region !== "전체") {
      params.region = filters.region;
    }

    if (filters.serviceType !== "전체") {
      params.serviceType = filters.serviceType;
    }

    if (filters.searchKeyword.trim()) {
      params.searchKeyword = filters.searchKeyword.trim();
    }

    return params;
  }, [filters]);

  return {
    filters,
    setRegion,
    setServiceType,
    setSortBy,
    setSearchKeyword,
    resetFilters,
    getFilterParams,
  };
};
