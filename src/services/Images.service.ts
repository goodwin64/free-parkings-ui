import findParkings from '../assets/images/findParking.png';
import myAccount from '../assets/images/myAccount.svg';
import myDrives from '../assets/images/myDrives.png';


export default class ImagesService {
  public static get driverImages() {
    return {
      findParkings,
      myAccount,
      myDrives,
    }
  }
}
