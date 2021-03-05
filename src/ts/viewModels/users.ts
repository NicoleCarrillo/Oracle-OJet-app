import * as ko from "knockout";
import * as AccUtils from "../accUtils";
import "ojs/ojknockout";
import "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojbutton";
import "ojs/ojprogress-bar";
import { ojListView } from "ojs/ojlistview";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import UserService from '../service/user.service';

interface UserData{
  name: string;
  title: string;
  email: string;
}

class UsersViewModel {
 
  public usersDataProvider : ArrayDataProvider<UserData['name'],UserData>;
  public newName: ko.Observable<string>;
  public newTitle: ko.Observable<string>;
  public newEmail: ko.Observable<string>;
  private userDataArray: ko.ObservableArray<UserData>;

 //* SERVICE
 public userService = new UserService();

 //* LOADED
 public dataLoaded: ko.Observable<boolean>;
 
 //* COMPUTED
 public saveDisabled: ko.Computed;

  constructor() {
 
    //* PROGRESS BAR
    this.dataLoaded = ko.observable(false);
  
    //* FORM SECTION
    this.newName = ko.observable('');
    this.newTitle = ko.observable('');
    this.newEmail = ko.observable('');
    this.userDataArray = ko.observableArray();
  
    this.usersDataProvider = new ArrayDataProvider(this.userDataArray, {
      keyAttributes: 'name'
    });
  
    this.getUsers();
  
    //* COMPUTED
    this.saveDisabled = ko.computed(() => {
      return this.newName() === ''|| this.newEmail () === '' || this.newTitle() === '';
    });

  }

  //* HANDLERS
  public handleListSelectionChanged = (event: ojListView.selectedChanged<UserData['name'], UserData>) => {
    console.log(event);
  }

  //* REST
  private getUsers = () => {
    this.userService.getUsers().then(response => {
      console.log(response);
      response.data.users.forEach(user => {
        this.userDataArray.push({ name: user.name, title: user.title, email: user.email });
      });
      this.dataLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  }


  //* ACTIONS
  public saveUser = () => {
    console.log(`New name: ${this.newName()}`);
    console.log(`New title: ${this.newTitle()}`);
    console.log(`New email: ${this.newEmail()}`);

    //*this.userDataArray().push({ name: this.newName(), title: this.newTitle(), email: this.newEmail() });
    //*this.userDataArray.valueHasMutated();

    this.userDataArray.push({ name: this.newName(), title: this.newTitle(), email: this.newEmail() });
  }

public discardChanges = () => {
  console.log('Cancel action');
  this.newName('');
  this.newTitle('');
  this.newEmail('');
}

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Users page loaded.");
    document.title = "Users";
    // implement further logic if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
}

export = UsersViewModel;