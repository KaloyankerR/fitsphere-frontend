import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const PrimaryButton = ({ text, color = "primary", sx, ...props }) => {
  return (
    <Button type="submit" fullWidth variant="contained" color={color} sx={sx} {...props}>
      {text}
    </Button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']), // Include all color options you plan to support
  sx: PropTypes.object,
};

export default PrimaryButton;
