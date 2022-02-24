import { Alert } from "react-native";

import Deferred from "es6-deferred";

class DialogService {
  confirm = ({ title, template, okText, cancelText }) => {
    const deferred = new Deferred();
    Alert.alert(
      title,
      template,
      [
        {
          text: okText,
          onPress: () => {
            deferred.resolve();
          }
        },
        {
          text: cancelText,
          onPress: () => {
            deferred.reject();
          }
        }
      ],
      {
        cancelable: true
      }
    );
    return deferred.promise;
  };
}

const dialogService = new DialogService();
export default dialogService;
