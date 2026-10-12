/** Lightweight, CSS-driven brand reveal shown on the initial homepage render. */
export function HomePreloader() {
  return (
    <div className="oar-preloader" role="status" aria-label="Loading Oar Shipping">
      <div aria-hidden="true" className="oar-preloader__glow" />
      <div className="oar-preloader__content">
        <span aria-hidden="true" className="oar-preloader__logo" />
        <p className="oar-preloader__tagline">Marine Logistics <span>·</span> Port Execution</p>
        <svg aria-hidden="true" className="oar-preloader__wave" viewBox="0 0 200 24" fill="none">
          <path
            className="oar-preloader__wave-track"
            d="M2 12C18 2 34 2 50 12s32 10 48 0 32-10 48 0 32 10 52 0"
          />
          <path
            className="oar-preloader__wave-line"
            d="M2 12C18 2 34 2 50 12s32 10 48 0 32-10 48 0 32 10 52 0"
          />
        </svg>
        <span className="oar-preloader__loading">Connecting your port call</span>
      </div>
      <span className="sr-only">Loading homepage</span>
    </div>
  );
}
