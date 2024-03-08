import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ArrowDownIcon = (props: SvgIconProps): JSX.Element => {
  const { htmlColor } = props;

  return (
    <SvgIcon {...props}>
      <path
        d="M4.463 8.476a.75.75 0 0 1 1.061-.013l5.606 5.477a1.236 1.236 0 0 0 1.74 0l.006-.007 5.6-5.47a.75.75 0 0 1 1.048 1.074l-5.597 5.467a2.736 2.736 0 0 1-3.854 0L4.476 9.537a.75.75 0 0 1-.013-1.061z"
        fill={htmlColor}
      />
    </SvgIcon>
  );
};

export default ArrowDownIcon;
