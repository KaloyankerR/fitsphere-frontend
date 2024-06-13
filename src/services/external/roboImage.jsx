import { Component } from "react";
import PropTypes from "prop-types";

class RoboImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchImage(this.props.input);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.input !== this.props.input) {
      this.fetchImage(this.props.input);
    }
  }

  fetchImage(input) {
    const url = `https://robohash.org/${encodeURIComponent(
      input
    )}?size=200x200`;
    this.setState({ loading: true });
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        this.setState({
          imageUrl: URL.createObjectURL(blob),
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          imageUrl: "", // Handle the error case by clearing the image or setting an error image
          loading: false,
        });
      });
  }

  render() {
    const { imageUrl, loading } = this.state;
    return (
      <div>
        {loading ? (
          <p>Loading image...</p>
        ) : (
          imageUrl && <img src={imageUrl} alt="RoboHash Image" />
        )}
      </div>
    );
  }
}

export default RoboImage;

RoboImage.propTypes = {
  input: PropTypes.string.isRequired,
};
