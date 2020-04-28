import { Injectable } from "@angular/core";
import { crudService } from "./crud.service";
import { HttpClient } from "@angular/common/http";
import { Task } from "../task.model";
import { Subject, BehaviorSubject } from "rxjs";
import { FileSaverService } from "ngx-filesaver";

@Injectable({
  providedIn: "root",
})

// ####################################################################################################################################################
export class DataStorageService {
  //###################################################################################################################
  addDirectiveSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService
  ) {}

  storeTasksList(list: Task[]) {
    this.http
      .put("https://frippashop.firebaseio.com/TasksList.json", list)
      .subscribe();
    localStorage.removeItem("tasksList");
    this.downloadTable(list);
  }

  fetchTasksList() {
    return this.http.get<any[]>(
      "https://frippashop.firebaseio.com/TasksList.json"
    );
  }

  // #############################################################################  PRIVATE ##############################################################

  private downloadTable(list: Task[]) {
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const lastTaskAdded = list[list.length - 1];
    const dateObj = lastTaskAdded.date;
    const monthIndex = dateObj.getMonth();
    const monthString = monthsArray[+monthIndex];
    const yearString = dateObj.getFullYear();
    const id = lastTaskAdded.id;

    const text = JSON.stringify(list);
    const fileName = `Table-ID${id}-${monthString}${yearString}.json`;
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([text], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName);
  } //onSaveButton
} //class #################################################################################################################################################
// ########################################################################################################################################################
