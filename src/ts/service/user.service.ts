import axios from 'axios';
import { AxiosPromise } from 'axios';
 
class UserService {
 
   private readonly URL = 'https://jsonblob.com/api/jsonBlob/'
 
   constructor() { }
 
   public getUsers(): AxiosPromise {
       return axios.get(this.URL + 'df416800-7d60-11eb-b747-db65f3c0f721');
   }
 
}
 
export default UserService;

