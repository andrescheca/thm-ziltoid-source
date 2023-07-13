/* eslint-disable @typescript-eslint/no-empty-function */
function CupOfCoffee({ className = "" }: { className?: string }) {
  return (
    <svg
      id="cup-of-coffee"
      className={`transition-transform animate-cup-of-coffee ${className}`}
      data-name="CupOfCoffee"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 544.1 500.2"
    >
      <g id="Layer3">
        <g id="Layer_3_1_">
          <path
            d="M358.2,250.1c29.3,0,53,31.5,53,70.3s-23.7,70.3-53,70.3 M358.2,359.8c16.4,0,29.7-17.6,29.7-39.4
		S374.6,281,358.2,281 M158.3,217.3c0,0,0,148.3,0,188.3s196.4,42,196.4,0s0-188.3,0-188.3 M256.6,188.2c-54.2,0-98.2,13-98.2,29.1
		c0,2.4,0.9,4.6,2.7,6.8c10.4,12.8,49.2,22.2,95.5,22.2c54.2,0,98.2-13,98.2-29.1S310.8,188.2,256.6,188.2z"
          />
          <path d="M227,61.9c-44.8-3.2-52.1,45-19.6,48.8s38.8,48,3.1,60.2" />
          <path d="M267.9,61.9c-44.8-3.2-52.1,45-19.6,48.8s38.8,48,3.1,60.2" />
          <path d="M307.6,61.6c-44.8-3.2-52.1,45-19.6,48.8c32.5,3.7,38.8,48,3.1,60.2" />
        </g>
      </g>
    </svg>
  );
}
export default CupOfCoffee;
