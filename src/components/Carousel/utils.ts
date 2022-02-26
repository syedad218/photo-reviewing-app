import React, { Dispatch } from "react";
import { fetchUserLikedImages } from "../../lib/actions";

export const checkIfLastElementVisible = (
  node: HTMLDivElement | null,
  loading: boolean,
  hasMore: boolean,
  dispatch: Dispatch<any>,
  observer: React.MutableRefObject<IntersectionObserver | null>
) => {
  if (loading) return;
  if (observer?.current) observer.current?.disconnect();
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      dispatch(fetchUserLikedImages.start());
    }
  });
  if (node) observer.current?.observe(node);
};

export const checkRightScroll = (scrollContainerRef: HTMLDivElement | null) => {
  if (scrollContainerRef) {
    const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef;
    return scrollWidth > clientWidth + scrollLeft;
  }
  return false;
};

export const checkLeftScroll = (scrollContainerRef: HTMLDivElement | null) => {
  if (scrollContainerRef) {
    const { scrollLeft } = scrollContainerRef;
    return scrollLeft > 0;
  }
  return false;
};

export const handleRightNavigation = (scrollContainerRef: HTMLDivElement | null) => {
  scrollContainerRef?.scrollBy({
    top: 0,
    left: scrollContainerRef.clientWidth,
    behavior: "smooth",
  });
};

export const handleLeftNavigation = (scrollContainerRef: HTMLDivElement | null) => {
  scrollContainerRef?.scrollBy({
    top: 0,
    left: -(scrollContainerRef?.clientWidth || 0),
    behavior: "smooth",
  });
};
