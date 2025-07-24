const { excuteSteps } = require("../../utilities/actions");
const { renameFile } = require("../../utilities/renameFile");
const { expect } = require("@playwright/test");
const {
  highlightElement,
  highlighterRemove,
} = require("../../utilities/highlight_element");
const path = require("path");
const fs = require("fs");
const testData = require("../../test_Data/testData.json");
const { FakerDataPage } = require("../../utilities/faker_data");
const randomPickAssignedUserOptions =
  testData.RevflowData.assignedUserList[
    Math.floor(Math.random() * testData.RevflowData.assignedUserList.length)
  ];

const randomPickBalanceStatusOptions =
  testData.RevflowData.balanceStatusOptions[
    Math.floor(Math.random() * testData.RevflowData.balanceStatusOptions.length)
  ];
const randomPickRootIssuesOptions =
  testData.RevflowData.rootIssuesOptions[
    Math.floor(Math.random() * testData.RevflowData.rootIssuesOptions.length)
  ];
const docTypesList =
  testData.RevflowData.documentTypeOptionsList[
    Math.floor(
      Math.random() * testData.RevflowData.documentTypeOptionsList.length
    )
  ];
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
let timeStamp = `${year}-${month}-${day}T${hours}:${minutes}`;
let taskTitle = `Task_${timeStamp}`;
let taskTitleAtt = `FTask_${timeStamp}`;
let rename = `rename_${timeStamp}`;
let tname = `Vyaghram`;
let invalidDate = `2066/21/12`;
exports.CreateTaskPage = class CreateTaskPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.taskNamecolumn = page.locator(
      "//div[@data-column-definition-name='name']"
    );
    this.TaskListBtn = page.locator("//span[text()=' Task List ']");
    this.createTaskBtn = page.locator("//span[text()='Create Task']");
    this.taskTitleInputFiled = page.locator(
      "//div[@class='arw-page-container__title']//input"
    );
    this.discriptionInputFiled = page.locator(
      "//div[@data-placeholder='Add a description...']"
    );
    this.checkedLinkFiles = page.locator(
      "//mat-checkbox[contains(@class,'mat-mdc-checkbox-checked')]/../../../div[@data-column-definition-name='name']//span/span "
    );
    this.blanceStatusDropdown = page.locator(
      "//span[text()=' Balance Status ']"
    );
    this.assignedUserDropdown = page.locator(
      "//mat-select[@id='mat-select-3']"
    );
    this.SearchInput = page.locator("//input[@placeholder='Search']");
    this.selectOptions = page.locator("(//mat-option[@role='option'])[1]");
    this.rootIssuesDropdown = page.locator("//span[text()=' Root Issue ']");
    this.addFileIcon = page.locator("//span[normalize-space()='Add File']");
    this.UploadFileInput = page.locator("//input[@type='file']");
    this.browseBtn = page.locator("//span[text()='Browse']");
    this.fileNameInput = page.locator("//input[@id='mat-input-6']");
    this.documentTypeDropdown = page.locator("//span[text()='Select']");
    this.editdocumentTypeDropdown = page.locator(
      "//arw-select[@formcontrolname='documentTypeId']/child::div/mat-select[contains(@id,'mat-select-')]"
    );
    this.attachBtn = page.locator("//span[text()=' Attach ']");
    this.dueDateField = page.locator("//input[@placeholder='mm/dd/yyy']");
    this.dueDateCalendarLabel = page.locator(
      "//div[@class='mat-calendar-controls']/descendant::span[@class='mdc-button__label']"
    );
    this.pickYearFromCalendar = page.locator("//span[text()=' 2028 ']");
    this.pickMonthFromCalendar = page.locator("//span[text()=' OCT ']");
    this.pickDateFromCalendar = page.locator("//span[text()=' 17 ']");
    this.saveTaskButton = page.locator("//span[contains(text(),'Save Task')]");
    this.cancelButton = page.locator("//span[contains(text(),'Cancel')]");
    this.CloseButton = page.locator("//span[text()='Close ']");
    this.sucessMessage = page.locator(
      "//span[text()='Task has been successfully created']"
    );
    this.existingTask = page.locator("(//arw-template-renderer)[1]//a");
    this.taskNameheader = page.locator(
      "(//div[normalize-space()='Task Name'])[1]"
    );
    this.taskNameFilter = page.locator(
      "(//div[normalize-space()='Task Name']//button[@aria-haspopup='menu'])[1]"
    );
    this.linkBtn = page.locator("//span[text()=' Link ']");
    this.dueDateheader = page.locator(
      "(//div[normalize-space()='Due Date'])[1]"
    );
    this.dueDateFillter = page.locator(
      "(//div[normalize-space()='Due Date']//button[@aria-haspopup='menu'])[1]"
    );
    this.checkBox = page.locator("(//input[@type='checkbox'])[1]");
    this.clearFillterBtn = page.locator("//span[text()='Clear filters']");
    this.filterSearchInput = page.locator("//input[@id='mat-input-1']");
    this.searchfilterField = page.locator(
      "(//input[contains(@id,'mat-input')])[2]"
    );
    this.applyBtn = page.locator("//span[text()='Apply']");
    this.morethan500Error = page.locator(
      "//div[contains(@class,'mat-mdc-dialog-surface')]/descendant::div[contains(text(),'administrator')]"
    );
    this.filesHeader = page.locator("//span[text()='Files']");
    this.taskNameFilter = page.locator(
      "(//arw-icon[@name='filterFunnel01'])[1]"
    );
    this.searchTaskNameFilter = page.locator(
      "(//div[@class='relative flex']/input)[2]"
    );
    this.applyFilterBtn = page.locator("//span[text()='Apply']");
    this.firstTask = page.locator(
      "(//a[@class='ng-star-inserted']/parent::span)[1]"
    );
    this.fileNameEditIcon = page.locator("(//arw-button[@icon='edit01'])[1]");
    this.editFileNameInput = page.locator(
      "(//div[@class='relative flex'])[5]//input"
    );
    this.saveBtn = page.locator("//span[text()=' Save ']");
    this.taskRow = page.locator(
      "(//div[@class='cdk-virtual-scroll-content-wrapper']/child::div)[1]"
    );
    this.linkFromCaseBtn = page.locator("//span[text()='Link from a Case']");
    //this.firstlinkfile=page.locator("(//div[@data-column-definition-name='checkbox'])[2]");
    this.linkfileList = page.locator(
      "(//div[@data-column-definition-name='checkbox'])"
    );
    this.filesPresent= page.locator("(//arw-file-card/div/span)[1]");
    this.files = page.locator("//arw-file-card/div/span");
    this.unlinkBtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]"
    );
    this.navigateBackToTaskListBtn = page.locator(
      "//div[@class='arw-page-container__title']/arw-button"
    );
    this.finameofUnlinkbtn = page.locator(
      "(//arw-file-card//arw-button[@arwconfirm])[1]/parent::div/preceding-sibling::div[1]"
    );
    this.unlinkFromTaskBtn = page.locator(
      "//span[text()=' Unlink from Task ']"
    );
    this.fileNameField = page.locator(
      "(//div[@class='relative flex'])[5]//input"
    );
    this.emptyTaskMessage = page.locator(
      "//span[text()='Please fill out required fields']"
    );
    this.emptyTaskName = page.locator(
      "//span[@class='text-status-error-full'][text()='Add Task Title...']"
    );
    this.emptyBalance = page.locator(
      "//arw-select[@icon='coinsStacked01']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyRootIssue = page.locator(
      "//arw-select[@icon='annotationAlert']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.emptyDueDate = page.locator(
      "//arw-input[@icon='calendar']//arw-validation-errors/div[text()=' Value required ']"
    );
    this.fileHeader = page.locator("//span[text()='Files']");
    this.cancelTaskHeader = page.locator(
      "//h2[contains(text(),'You have unsaved changes')]"
    );
    this.continueBtn = page.locator("//span[text()=' Continue ']");
  }
  clickOnSaveBtn = async () => {
    await excuteSteps(this.test, this.saveBtn, "click", `Click on save button`);
  };
  clickonLinkFromCaseBtn = async () => {
    await excuteSteps(
      this.test,
      this.linkFromCaseBtn,
      "click",
      `Click on Link from Case button to link files`
    );
  };
  clickoneditDocType = async () => {
    await excuteSteps(
      this.test,
      this.editdocumentTypeDropdown,
      "click",
      `Clicking on document type dropdown`
    );
  };

  clickOnfileNameEditIcon = async () => {
    await excuteSteps(
      this.test,
      this.fileNameEditIcon,
      "click",
      `Clicking on edit name icon`
    );
  };
  clickOnFirstTask = async () => {
    await excuteSteps(
      this.test,
      this.firstTask,
      "click",
      `Clicking on task name`
    );
  };
  hoverOverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hover over task name header`
    );
  };
  clickOnTaskList = async () => {
    await excuteSteps(
      this.test,
      this.TaskListBtn,
      "click",
      `Click on the Task list button`
    );
  };
  clickOnCancelBtn = async () => {
    await excuteSteps(
      this.test,
      this.cancelButton,
      "click",
      `Clicking on cancel button`
    );
  };
  clickOnTaskNameFilter = async () => {
    await excuteSteps(
      this.test,
      this.taskNameFilter,
      "click",
      `Click on task name filter`
    );
  };
  fillTaskNameFilter = async (ftxt) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering task name to apply filter`,
      ftxt
    );
  };
  filluniqueTaskName = async (tname) => {
    await excuteSteps(
      this.test,
      this.searchTaskNameFilter,
      "fill",
      `Entering unique name into search filter`,
      tname
    );
  };
  clickOnCreateTaskBtn = async () => {
    await excuteSteps(
      this.test,
      this.createTaskBtn,
      "click",
      `Click on the create task button`
    );
  };
  fillTasktitle = async (txt) => {
    await excuteSteps(
      this.test,
      this.taskTitleInputFiled,
      "fill",
      `Entering task title`,
      txt
    );
  };
  fillTaskDescription = async (txt) => {
    await excuteSteps(
      this.test,
      this.discriptionInputFiled,
      "fill",
      `Entering description`,
      txt
    );
  };
  editFileName = async (newName) => {
    await excuteSteps(
      this.test,
      this.editFileNameInput,
      "fill",
      `Entering edited file name`,
      newName
    );
  };
  clickOnBalanceStatusdrop = async () => {
    await excuteSteps(
      this.test,
      this.blanceStatusDropdown,
      "click",
      `Click on the Balance Status btn`
    );
  };
  SearchDropdownOptions = async (txt) => {
    await excuteSteps(
      this.test,
      this.SearchInput,
      "fill",
      `Search dropdownOptions`,
      txt
    );
  };
  selectDropdownOptions = async () => {
    await excuteSteps(
      this.test,
      this.selectOptions,
      "click",
      `Select dropdown options`
    );
  };
  dbClickDueDateField = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "dblclick",
      `Double clicking on date field to fill input`
    );
  };
  clicOnRootIssuedrop = async () => {
    await excuteSteps(
      this.test,
      this.rootIssuesDropdown,
      "click",
      `Click on the root issues`
    );
  };
  clickOnDueDatedropdown = async () => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "click",
      `click on the due date filed`
    );
  };
  clickOnCalendarYearlabel = async () => {
    await excuteSteps(
      this.test,
      this.dueDateCalendarLabel,
      "click",
      `click on the calendar year label`
    );
  };
  selectYearFromCalandar = async () => {
    await excuteSteps(
      this.test,
      this.pickYearFromCalendar,
      "click",
      `Select year from canlendar`
    );
  };
  selectMonthFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickMonthFromCalendar,
      "click",
      `Select month from calendar`
    );
  };
  selectDateFromCalendar = async () => {
    await excuteSteps(
      this.test,
      this.pickDateFromCalendar,
      "click",
      `Click on the date in the calender`
    );
  };
  clickOnAddFilebtn = async () => {
    await excuteSteps(
      this.test,
      this.addFileIcon,
      "click",
      `Click on the Add file button`
    );
  };
  clickOnFirstLinkFile = async () => {
    await excuteSteps(
      this.test,
      this.firstlinkfile,
      "click",
      `Clicking on checkbox to link file`
    );
  };
  clickOnBrowseBtn = async () => {
    await excuteSteps(
      this.test,
      this.browseBtn,
      "click",
      `Click on the browser button`
    );
  };
  clickDocumentTypdrop = async () => {
    await excuteSteps(
      this.test,
      this.documentTypeDropdown,
      "click",
      `Click on document type dropdown`
    );
  };
  clickOnAttachBtn = async () => {
    await excuteSteps(
      this.test,
      this.attachBtn,
      "click",
      `Click on the attach button`
    );
  };
  clickOnTaskApplyFilter = async () => {
    await excuteSteps(
      this.test,
      this.applyFilterBtn,
      "click",
      `Click on apply filter button`
    );
  };
  clickOnSaveTaskButton = async () => {
    await excuteSteps(
      this.test,
      this.saveTaskButton,
      "click",
      `Click on the save task button`
    );
  };

  clickOnFileHeader = async () => {
    await excuteSteps(
      this.test, 
      this.fileHeader, 
      "click"
    );
  };

  fillDueDate = async (date) => {
    await excuteSteps(
      this.test,
      this.dueDateField,
      "fill",
      `Filling due date field with invalid date format`,
      date
    );
  };
  clickOnTaskCloseButton = async () => {
    await excuteSteps(
      this.test,
      this.CloseButton,
      "click",
      `Click on close button`
    );
  };
  hoverTaskNameHeader = async () => {
    await excuteSteps(
      this.test,
      this.taskNameheader,
      "hover",
      `Hovering task name header`
    );
  };
  clickOnTaskNameFilter = async () => {
    await excuteSteps(
      this.test,
      this.taskNameFilter,
      "click",
      `Click on the task name filter icon`
    );
  };
  searchfilterNameInput = async (txt) => {
    await excuteSteps(
      this.test,
      this.filterSearchInput,
      "fill",
      `Search task name`,
      txt
    );
  };
  searchfilterInputFiled = async (txt) => {
    await excuteSteps(
      this.test,
      this.searchfilterField,
      "fill",
      `Search task name`,
      txt
    );
  };
  clickOnApplyBtn = async () => {
    await excuteSteps(
      this.test,
      this.applyBtn,
      "click",
      `Click on the apply button`
    );
  };
  clickOnExistingTask = async () => {
    await excuteSteps(
      this.test,
      this.existingTask,
      "click",
      `Click on the existing task`
    );
  };
  hoverDuedateHeader = async () => {
    await excuteSteps(
      this.test,
      this.dueDateheader,
      "hover",
      `Hovering duedate header`
    );
  };
  clickOnDuedateFilter = async () => {
    await excuteSteps(
      this.test,
      this.dueDateFillter,
      "click",
      `Click on due date filter`
    );
  };
  clickOnDocumentType = async () => {
    await excuteSteps(
      this.test,
      this.documentTypeDropdown,
      "click",
      `Click on document type dropdown`
    );
  };
  uncheckduedatefillter = async () => {
    await excuteSteps(
      this.test,
      this.checkBox,
      "click",
      `Uncheck due date filter`
    );
  };
  scrollToClearFilter = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "scroll",
      `Scroll till clear filter comes into view port`
    );
  };
  clickOnClearallFilterbtn = async () => {
    await excuteSteps(
      this.test,
      this.clearFillterBtn,
      "click",
      `Click on clear all filter button`
    );
  };
  clickOnLinkBtn = async () => {
    await excuteSteps(
      this.test,
      this.linkBtn,
      "click",
      `Click on link button`
    );
  };
  selectAssignedUser = async () => {
    await excuteSteps(
      this.test,
      this.assignedUserDropdown,
      "click",
      `Click on Assigned user dropdown`
    );
  };
  clickOnContinueBtn = async () => {
    excuteSteps(
      this.test,
      this.continueBtn,
      "click",
      `Clicking on continue button`
    );
  };

  CreateTaskWithAttachment = async () => {
    await this.fillFieldsForCreateTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/36Docx_word.docx");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickDocumentTypdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAttachBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await expect(this.sucessMessage).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  fillFieldsForCreateTask = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clicOnRootIssuedrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
  };

  CreateTaskWithoutAttachmentDefaultUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.sucessMessage).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  CreateTaskWithoutAttachmentSelectedUser = async () => {
    await this.fillFieldsForCreateTask();
    await this.selectAssignedUser();
    await this.SearchDropdownOptions([randomPickAssignedUserOptions]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.sucessMessage).toBeVisible();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnTaskCloseButton();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterInputFiled([taskTitle]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  uploadFileUsingBrowser = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTasktitle([taskTitleAtt]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.fillTaskDescription([
      testData.RevflowData.addTaskData.discription,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickBalanceStatusOptions]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.clicOnRootIssuedrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([randomPickRootIssuesOptions]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.selectDropdownOptions();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnDueDatedropdown();
    await this.clickOnCalendarYearlabel();
    await this.selectYearFromCalandar();
    await this.selectMonthFromCalendar();
    await this.selectDateFromCalendar();
    await this.clickOnAddFilebtn();
    const file = path.resolve(
      "C:/Users/PrathyushaVemparala/Reports_publish/files/kane.png"
    );
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnDocumentType();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([docTypesList]);
    await this.selectDropdownOptions();
    await this.clickOnAttachBtn();
  };

  renameAttachedFile = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.filesPresent.isVisible()) {
        await this.clickOnfileNameEditIcon();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        const x = await renameFile(this.page, this.fileNameField, [rename]);
        await this.editFileName([x]);
        await this.clickoneditDocType();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.SearchDropdownOptions([docTypesList]);
        await this.page.waitForTimeout(parseInt(process.env.mediumWait));

        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.selectDropdownOptions();
        await this.clickOnSaveBtn();
        await expect(
          this.files.filter({ hasText: x }),
          `verifying file ${x} is linked to task or not`
        ).toHaveCount(1);
        break;
      } else {
        await this.navigateBackToTaskListBtn.click();
      }
    }
  };

  linkFiles = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.clickOnFirstTask();
    await this.clickOnAddFilebtn();
    await this.clickonLinkFromCaseBtn();

    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    const count = await this.linkfileList.count();
    console.log(count);
    if (count > 0) {
      let randomIndex = Math.floor(Math.random() * count);
      if (randomIndex === 1 && count > 2) {
        randomIndex = 2;
      }
      const randomCheckbox = this.linkfileList.nth(randomIndex);
      await randomCheckbox.click();
    }
    const linkfileselector = this.checkedLinkFiles;
    const linkFilename = await linkfileselector.innerText();
    await console.log(linkFilename);
    await this.clickOnLinkBtn();
    await expect(
      this.files.filter({ hasText: linkFilename }),
      `verifying file ${linkFilename} is linked to task or not`
    ).toHaveCount(1);
  };

  clearAllFiltersFeature = async () => {
    if (this.taskRow.isVisible()) {
      await this.hoverOverTaskNameHeader();
      await this.clickOnTaskNameFilter();
      await this.filluniqueTaskName([tname]);
      await this.clickOnTaskApplyFilter();
      await this.clickOnClearallFilterbtn();
    } else {
      await this.clickOnClearallFilterbtn();
    }
  };

  uploadFileSizegreaterthan500MB = async () => {
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnClearallFilterbtn();
    await this.hoverTaskNameHeader();
    await this.clickOnTaskNameFilter();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.searchfilterNameInput([
      testData.RevflowData.addTaskData.namefilter,
    ]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.clickOnApplyBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnExistingTask();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnAddFilebtn();
    const file = path.resolve(__dirname, "../files/506mb.pdf");
    await this.UploadFileInput.setInputFiles(file);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.morethan500Error).toHaveText(
      testData.RevflowData.addTaskData.fileexceededErMess
    );
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
  };

  unlinkFile = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    const count = await this.taskNamecolumn.count();
    for (let i = 1; i < count; i++) {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
      const task = this.taskNamecolumn.nth(i);
      await task.click();
      await this.page.waitForTimeout(parseInt(process.env.mediumWait));
      if (await this.unlinkBtn.isVisible()) {
        const unlinkFilename = await this.finameofUnlinkbtn.innerText();
        console.log(unlinkFilename);
        await this.unlinkBtn.click();
        await this.page.waitForTimeout(parseInt(process.env.smallWait));
        await this.unlinkFromTaskBtn.click();
        if (await this.filesPresent.isVisible()) {
          await expect(
            this.files.filter({ hasText: unlinkFilename }),
            `Verifying file ${unlinkFilename} is NOT linked to task`
          ).toHaveCount(0);
        }
        break;
      } else {
        await this.navigateBackToTaskListBtn.click();
      }
    }
  };

  emptyTaskFieldValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnSaveTaskButton();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.emptyTaskMessage).toBeVisible();
    await expect(this.emptyTaskName).toBeVisible();
    await expect(this.emptyBalance).toBeVisible();
    await expect(this.emptyRootIssue).toBeVisible();
    await expect(this.emptyDueDate).toBeVisible();
    await this.navigateBackToTaskListBtn.click();
  };
  searchFieldsValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    const fakerPage = new FakerDataPage();
    const data = fakerPage.fakerData();
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.clickOnBalanceStatusdrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.mediumWait));
    await expect(this.selectOptions).not.toBeVisible();
    await this.page.keyboard.press("Escape");
    await this.clicOnRootIssuedrop();
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await this.SearchDropdownOptions([data.additionalneeds]);
    await this.page.waitForTimeout(parseInt(process.env.smallWait));
    await expect(this.selectOptions).not.toBeVisible();
    await this.page.keyboard.press("Escape");
  };

  dueDateFieldValidation = async () => {
    this.test.step("", async () => {
      await this.page.waitForTimeout(parseInt(process.env.largeWait));
    });
    await this.clickOnTaskList();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await this.clearAllFiltersFeature();
    await this.clickOnCreateTaskBtn();
    await this.page.waitForTimeout(parseInt(process.env.largeWait));
    await this.dbClickDueDateField();
    await this.fillDueDate([invalidDate]);
    await this.clickOnFileHeader();
    await expect(this.emptyDueDate).toBeVisible();
  };

  fillFieldsCancelValidation = async () => {
    await this.fillFieldsForCreateTask();
    await this.clickOnCancelBtn();
    await expect(this.cancelTaskHeader).toBeVisible();
    await this.clickOnContinueBtn();
    await this.page.waitForTimeout(parseInt(process.env.extraLargeWait));
    await expect(this.createTaskBtn).toBeVisible();
  };
};
