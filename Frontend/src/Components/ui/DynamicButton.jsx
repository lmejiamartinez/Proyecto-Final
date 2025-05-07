import { IconButton, Tooltip } from "@mui/material";

const DynamicButton = ({
  children,
  onClick,
  title,
  placement,
  color,
  disabled,
  type,
}) => {
  return (
    <Tooltip
      arrow
      type={type}
      placement={placement ?? "top"}
      title={title ?? ""}
    >
      <span>
        <IconButton
          type={type}
          color={color ?? "primary"}
          disabled={disabled ?? false}
          onClick={onClick}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DynamicButton;
