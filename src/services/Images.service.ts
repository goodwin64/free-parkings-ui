import findParkings from '../assets/images/findParking.png';
import myAccount from '../assets/images/myAccount.svg';
import myDrives from '../assets/images/myDrives.png';
import defaultUserIcon from '../assets/images/defaultUserIcon.svg';


export default class ImagesService {
  public static commonImages = {
    defaultUserIcon,
  };

  public static driverImages = {
    findParkings,
    myAccount,
    myDrives,
  };

  public static getBase64(file?: File): Promise<string> {
    if (!file) {
      return Promise.resolve('');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // @ts-ignore
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
      .then(value => value ? String(value) : '')
      .catch(err => String(err));
  };
}
