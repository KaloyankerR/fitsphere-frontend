import PropTypes from 'prop-types';
import { ErrorMessage } from "formik";

const ErrorMessageComponent = ({ name }) => {
    return (
        <ErrorMessage name={name}>
            {(msg) => (
                <div
                    style={{
                        marginTop: "8px",
                        backgroundColor: "red",
                        color: "rgba(255,255,255,0.9)",
                        border: "1px solid red",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                >
                    {msg}
                </div>
            )}
        </ErrorMessage>
    );
};

ErrorMessageComponent.propTypes = {
    name: PropTypes.string.isRequired,
};

export default ErrorMessageComponent;
