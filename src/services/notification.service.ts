import { Alert } from "react-native";
import { Toast } from "native-base";

const showError = (title: string, template?: string) => {
  Alert.alert(
    title,
    template,
    [
      {
        text: "OK",
        onPress: () => {}
      }
    ],
    {
      cancelable: false
    }
  );
};

const showInfo = (title, template: string) => {
  Toast.show({ text: template });
};

export default {
  showInfo,
  showError
};
