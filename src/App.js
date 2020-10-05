import React from "react";
import Grid from "./grid";

import "./App.css";
let headerGridInfo = [
    {
      name: "row",
      localization: "ردیف",
      className: "col-1",
    },
    {
      name: "name",
      hasChild: "name.en",
      localization: "نام انگلیسی",
      className: "col-2 p-0",
    },
    {
      name: "name",
      hasChild: "name.fa",
      localization: "نام فارسی",
      className: "col-2 p-0",
    },
    {
      name: "code",
      localization: "کد",
      className: "col-2 p-0",
    },
    {
      name: "countryCode",
      localization: "کد کشور",
      className: "col-2 p-0",
    },
    {
      name: "type",
      localization: "نوع",
      className: "col-2 p-0",
    },
    {
      name: "delete",
      localization: "حذف",
      className: "col-1 p-0",
      //render: this.renderDeleteIcon,
      // onClickForGrid: this.rednerDeleteNoticeAlert,
      //neededItemFieldForOnclick: "_id",
    },
  ],
  contentGrid = [
    {
      id: 1,
      name: { fa: "ایران", en: "Iran" },
      code: "IR",
      countryCode: "0098",
      type: "Country",
    },
    {
      id: 1,
      name: { fa: "کانادا", en: "Canada" },
      code: "CA",
      countryCode: "0011",
      type: "Country",
    },
  ];
function returnSortField(fieldName, sortType) {
  console.log("fieldName, sortType", fieldName, sortType);
}
function App() {
  return (
    <div className={"col p-0"}>
      <Grid
        headerGrid={headerGridInfo}
        contentGrid={contentGrid}
        //onClick={this.onGrid}
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={10}
        //pagingClick={this.pagingClick}
        returnSortField={returnSortField}
      />
    </div>
  );
}

export default App;
