import {
  showMessage,
  hideMessage,
  MessageOptions,
} from 'react-native-flash-message';

export default class ToastService {
  static showToast(options: MessageOptions): void {
    showMessage({
      message: options.message,
      description: options.description ? options.description : undefined,
      type: options.type ? options.type : options.type,
      icon: options.icon ? options.icon : 'auto',
      duration: options.duration ? options.duration : 1850,
    });
  }

  static hideToast(): void {
    hideMessage();
  }
}
