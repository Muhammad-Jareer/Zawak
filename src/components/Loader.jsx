import Logo from '../assets/logo.png';

export const Loader = () => (
  <div className="relative flex justify-center items-center py-8">
    {/* Spinner Circle */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="48px"
      height="48px"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
    >
      <circle
        cx="64"
        cy="64"
        r="56"
        stroke="#db2777"
        strokeWidth="8"
        fill="none"
        strokeDasharray="355.3"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="355.3"
          to="0"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    {/* Logo centered on top of the spinner */}
    <img
      src={Logo}
      alt="Logo"
      className="absolute w-12 h-12" 
    />
  </div>
);
