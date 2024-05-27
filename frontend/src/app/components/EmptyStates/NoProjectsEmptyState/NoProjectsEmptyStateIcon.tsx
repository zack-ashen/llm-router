const NoProjectsEmptyStateIcon = () => (
  <svg
    width="140"
    height="140"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="140"
      height="140"
      rx="16"
      fill="url(#paint0_linear_676_2275)"
    />
    <g clipPath="url(#clip0_676_2275)">
      <path
        d="M52.8571 36.0527C45.7589 36.0527 40 41.7548 40 48.783V91.2172C40 98.2454 45.7589 103.947 52.8571 103.947H91.4286H95.7143C98.0848 103.947 100 102.051 100 99.7041C100 97.3569 98.0848 95.4606 95.7143 95.4606V86.9738C98.0848 86.9738 100 85.0775 100 82.7304V40.2962C100 37.949 98.0848 36.0527 95.7143 36.0527H91.4286H52.8571ZM52.8571 86.9738H87.1429V95.4606H52.8571C50.4866 95.4606 48.5714 93.5644 48.5714 91.2172C48.5714 88.8701 50.4866 86.9738 52.8571 86.9738ZM57.1429 55.1481C57.1429 53.9812 58.1071 53.0264 59.2857 53.0264H85C86.1786 53.0264 87.1429 53.9812 87.1429 55.1481C87.1429 56.3151 86.1786 57.2698 85 57.2698H59.2857C58.1071 57.2698 57.1429 56.3151 57.1429 55.1481ZM59.2857 61.5133H85C86.1786 61.5133 87.1429 62.468 87.1429 63.635C87.1429 64.8019 86.1786 65.7567 85 65.7567H59.2857C58.1071 65.7567 57.1429 64.8019 57.1429 63.635C57.1429 62.468 58.1071 61.5133 59.2857 61.5133Z"
        fill="url(#paint1_linear_676_2275)"
      />
    </g>
    <defs>
      <filter
        id="filter0_dddd_676_2275"
        x="32"
        y="34.0527"
        width="76"
        height="96.8945"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_676_2275"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="5" />
        <feGaussianBlur stdDeviation="2.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_676_2275"
          result="effect2_dropShadow_676_2275"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="11" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_dropShadow_676_2275"
          result="effect3_dropShadow_676_2275"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="19" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
        />
        <feBlend
          mode="normal"
          in2="effect3_dropShadow_676_2275"
          result="effect4_dropShadow_676_2275"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect4_dropShadow_676_2275"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_676_2275"
        x1="70"
        y1="0"
        x2="70"
        y2="140"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D7D4E6" />
        <stop offset="1" stopColor="#8B80C5" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_676_2275"
        x1="70"
        y1="36.0527"
        x2="70"
        y2="103.947"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F6F6F8" />
      </linearGradient>
      <clipPath id="clip0_676_2275">
        <rect
          width="60"
          height="67.8947"
          fill="white"
          transform="translate(40 36.0527)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default NoProjectsEmptyStateIcon;
