/**
 * Shared look for text-like controls: 40px high, 6px radius, Border color,
 * Marine Blue on focus, Error when `aria-invalid="true"`.
 */
export const controlStyles =
  "type-body-lg block w-full rounded-md border border-control bg-white px-3 text-dark-text transition-colors duration-200 ease-standard " +
  "placeholder:text-slate focus-visible:border-marine-blue focus-visible:outline-offset-0 focus-visible:outline-ocean " +
  "aria-invalid:border-error aria-invalid:focus-visible:outline-error " +
  "disabled:cursor-not-allowed disabled:bg-off-white disabled:text-slate";
