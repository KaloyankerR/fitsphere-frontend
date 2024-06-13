import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const RedirectionButton = ({ href, text, color, variant, sx, onClick }) => {
  return (
    <Link href={href} underline="none">
      <Button variant={variant} color={color} sx={sx} fullWidth onClick={onClick}>
        {text}
      </Button>
    </Link>
  );
};

RedirectionButton.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "secondary",
    "warning",
    "success"
  ]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
  sx: PropTypes.object,
  onClick: PropTypes.func
};

export default RedirectionButton;
