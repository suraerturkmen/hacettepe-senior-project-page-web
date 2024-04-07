import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ArrowDownIcon = (props: SvgIconProps): JSX.Element => {
  const { htmlColor } = props;

  return (
    <SvgIcon {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.51184 1.48328C10.1627 2.15175 10.1627 3.23554 9.51184 3.90401L4.02369 9.54049L9.51184 15.177C10.1627 15.8454 10.1627 16.9292 9.51184 17.5977C8.86097 18.2662 7.8057 18.2662 7.15482 17.5977L0.488155 10.7509C-0.162718 10.0824 -0.162718 8.99859 0.488155 8.33013L7.15482 1.48328C7.8057 0.814817 8.86097 0.814817 9.51184 1.48328Z"
        fill="#1538B0"
      />
    </SvgIcon>
  );
};

export default ArrowDownIcon;
