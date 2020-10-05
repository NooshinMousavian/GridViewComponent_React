import Grid from "./grid";
import React, { Component } from "react";

class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  renderGrid = (headerGridInfo, contentGrid, activePage, itemsCountPerPage) => {
    if (headerGridInfo.length)
      return (
        <div className={"col p-0"}>
          {/*بر اساس تعداد گرید اینفو و نام ان ها رندر می کند*/}
          <Grid
            headerGrid={headerGridInfo}
            contentGrid={contentGrid}
            onClick={this.onGrid}
            activePage={activePage ? activePage : 1}
            itemsCountPerPage={itemsCountPerPage ? itemsCountPerPage : 10}
            totalItemsCount={
              contentGrid && contentGrid[0] ? contentGrid[0].totalCount : 0
            }
            pagingClick={this.pagingClick}
            returnSortField={this.returnSortField}
          />
        </div>
      );
  };

  returnSortField = (fieldName, sortType) => {
    console.log("hhhhhhhhhhhh", fieldName, sortType);
    this.setState({ fieldName, sortType });
  };
}
export default ShowData;
