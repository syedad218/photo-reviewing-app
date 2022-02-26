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

export const handleRightNavigation = (
  scrollContainerRef: HTMLDivElement | null
) => {
  scrollContainerRef?.scrollBy({
    top: 0,
    left: scrollContainerRef.clientWidth,
    behavior: "smooth",
  });
};

export const handleLeftNavigation = (
  scrollContainerRef: HTMLDivElement | null
) => {
  scrollContainerRef?.scrollBy({
    top: 0,
    left: -(scrollContainerRef?.clientWidth || 0),
    behavior: "smooth",
  });
};
