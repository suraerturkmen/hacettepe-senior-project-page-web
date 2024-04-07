import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ArrowDownIcon = (props: SvgIconProps): JSX.Element => {
  const { htmlColor } = props;

  return (
    <SvgIcon {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.710776 1.45886C1.41303 0.79171 2.55162 0.79171 3.25388 1.45886L10.4469 8.29219C11.1491 8.95933 11.1491 10.041 10.4469 10.7081L3.25388 17.5415C2.55162 18.2086 1.41303 18.2086 0.710776 17.5415C0.00851735 16.8743 0.00851735 15.7927 0.710776 15.1255L6.63221 9.50016L0.710776 3.8748C0.00851735 3.20766 0.00851735 2.126 0.710776 1.45886Z"
        fill="#1538B0"
      />
    </SvgIcon>
  );
};

export default ArrowDownIcon;
