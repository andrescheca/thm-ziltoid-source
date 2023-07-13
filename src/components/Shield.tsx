/* eslint-disable @typescript-eslint/no-empty-function */
function Shield({ className = "" }: { className?: string }) {
  return (
    <svg
      id="planet"
      className={`transition-transform animate-shield ${className}`}
      data-name="Shield"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 544.1 500.2"
    >
      <g id="shield">
        <path
          d="M206.6,98.1l-99.8-11.3c0,0-36.5,280.3,179.5,375.7C491.8,381.4,466.4,86.8,466.4,86.8l-103,11.3l-77.1-62.3
		L206.6,98.1z"
        />
      </g>
    </svg>
  );
}
export default Shield;
