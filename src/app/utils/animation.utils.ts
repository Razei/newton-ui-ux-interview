export const triggerDeleteAnimation = (
  element: HTMLElement,
  deleteClass: string,
  /**
   * You may need to trigger change detection manually in the callback
   */
  callback: () => void
) => {
  const listener = (event: TransitionEvent) => {
    // Prevent child transitions from triggering this logic
    if (event.target !== element) {
      return;
    }

    callback();
    element.removeEventListener('transitionend', listener, false);
    element.classList.remove(deleteClass);
  };

  element.addEventListener('transitionend', listener, false);
  element.classList.add(deleteClass);
};
