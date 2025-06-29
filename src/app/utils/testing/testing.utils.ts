import { DebugElement } from '@angular/core';

export function getNativeDebugElement(debugEl: DebugElement) {
  return debugEl.nativeElement as HTMLElement;
}

/**
 * Essentially https://testing-library.com/ at home.
 *
 * @param debugElement
 * @param regexOrString
 * @param elementName
 * @returns
 */
export function queryByTextContent(
  debugElement: DebugElement,
  /**
   * Use string for exact matches, regex otherwise.
   */
  regexOrString: string | RegExp,
  elementName?: string
) {
  const element = debugElement.query((debugEl) => {
    const nativeDebugElement = getNativeDebugElement(debugEl);

    const isString = typeof regexOrString === 'string';
    const trimmedContent = nativeDebugElement.textContent?.trim();
    const tagNameMatches = elementName ? elementName === debugEl.name : true;
    const contentMatches = isString
      ? trimmedContent === regexOrString
      : !!trimmedContent?.match(regexOrString);

    return tagNameMatches && contentMatches;
  });

  if (!element) {
    throw new Error(
      `No element found with content "${regexOrString}"${elementName ? ', and tag name "' + elementName + '"' : ''}.`
    );
  }

  return element;
}
