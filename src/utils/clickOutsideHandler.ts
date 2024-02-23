// utils/clickOutsideHandler.ts
export const handleOutsideClick = (
  event: MouseEvent,
  dropdownRef: React.RefObject<HTMLElement>,
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target as Node)
  ) {
    toggleFunction(false)
  }
}
