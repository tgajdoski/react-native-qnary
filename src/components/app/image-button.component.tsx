import * as React from "react";
import { Image } from "react-native";

import { Button } from "native-base";
import * as PropTypes from "prop-types";

export interface ImageButtonProps {
  image: any;
  width: number;
  height: number;
  onPress: () => void;
}

export default class ImageButton extends React.Component<ImageButtonProps> {
  static propTypes = {
    image: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
  };
  public render() {
    const { image, width, height, onPress } = this.props;
    const imageStyle = { width, height };
    return (
      <Button
        transparent={true}
        onPress={onPress}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
      >
        <Image resizeMode="contain" source={image} style={imageStyle} />
      </Button>
    );
  }
}
