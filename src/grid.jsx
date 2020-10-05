// import Pagination from "react-js-pagination";
import React, { useState, useEffect, memo } from "react";
import getLodash from "lodash/get";
import propTypes from "prop-types";
import Pagination from "react-js-pagination";

const Grid = (props) => {
  const [headerList, setheaderList] = useState([]);

  const renderGridItem = (item, itm, index) => {
    const { language } = props;

    if (itm.render) {
      let fieldForOnClick;
      if (itm.neededItemFieldForOnclick === "*") {
        fieldForOnClick = Object.assign({}, item);
        fieldForOnClick.index = index;
      } else fieldForOnClick = item[itm.neededItemFieldForOnclick];
      return (
        <div
          className="text-center"
          onClick={(event) => itm.onClickForGrid(fieldForOnClick, event, index)}
        >
          {itm.render(item[itm.neededItemFieldForRender])}
        </div>
      );
    } else if (typeof item[itm.name] === "boolean") {
      if (item[itm.name] === true)
        return <i className={"fas fa-check-square text-primary"} />;
      else return null;
    } else if (item[itm.name]) {
      if (itm.hasChild) {
        let getChild = getLodash(item, itm.hasChild);
        // if (getChild) return getChild ? getChild : item[itm.name];
        if (getChild) {
          if (typeof getChild === "object") {
            if (getChild[language.name]) return getChild[language.name];
            return getChild[itm.name];
          }

          return getChild;
        }
        // return typeof getChild === "object"
        //   ? getChild[language.name]
        //   : getChild;
        else return null;
      } else
        return typeof item[itm.name] === "object"
          ? item[itm.name][language.name]
          : item[itm.name];
    } else if (!item[itm.name] && itm.hasChild) {
      let getChild = getLodash(item, itm.hasChild);
      return getChild[itm.name];
    }
  };

  const renderGridContent = () => {
    const {
      contentGrid,
      headerGrid,
      onClick,
      itemsCountPerPage,
      activePage,
    } = props;
    if (contentGrid && contentGrid.length > 0)
      return contentGrid.map((item, index) => {
        return (
          <div
            key={index}
            className={"col d-flex flex-row py-4 px-2 align-items-center"}
            onClick={(event) => {
              onClick(item, event);
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "#e1e1e1",
              backgroundColor: index % 2 === 0 ? "white" : "#fdfdfd",
              cursor: "pointer",
            }}
          >
            {headerGrid.map((itm, indx) => {
              if (itm.name === "row")
                return (
                  <div
                    key={indx}
                    className={`text-center align-middle ${itm.className}`}
                    style={itm.style}
                  >
                    {index + 1 + itemsCountPerPage * (activePage - 1)}
                  </div>
                );
              else {
                return (
                  <div
                    key={indx}
                    className={`${itm.className} text-center align-middle`}
                    onClick={itm.onClick}
                  >
                    {renderGridItem(item, itm, index)}
                  </div>
                );
              }
            })}
          </div>
        );
      });
    else return null;
  };
  const renderpagination = () => {
    const {
      totalItemsCount,
      activePage,
      itemsCountPerPage,
      pagingClick,
    } = props;
    // if (totalItemsCount > 10)
    return (
      <div className="col d-flex justify-content-left py-3 mt-3">
        <Pagination
          // pageRangeDisplayed={10}
          linkClass="page-link"
          itemClass="page-item"
          innerClass="pagination py-4 directionInitial"
          activeClass="active"
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          onChange={(event) => pagingClick(event)}
        />
      </div>
    );
    // else return null;
  };
  const sort = (item) => {
    props.returnSortField(item.name, item.isAsc);
    let cloneList = [...headerList];
    if (item.hasChild)
      cloneList.find(
        (field) => field.name === item.name && field.hasChild === item.hasChild
      ).isAsc = !item.isAsc;
    else
      cloneList.find((field) => field.name === item.name).isAsc = !item.isAsc;
    setheaderList(cloneList);
  };

  const renderHeader = () => {
    const { headerGrid } = props,
      headerGridCopy = headerGrid;

    if (headerList.length === 0) {
      headerGridCopy.forEach((element) => {
        element.isAsc = true;
      });
      setheaderList(headerGridCopy);
    }
    if (headerList)
      return (
        <div
          className={"col p-0"}
          style={{
            border: "1.5px solid rgb(217, 217, 217)",
            borderRadius: "4px",
            boxShadow: "rgb(246, 246, 246) -1px 2px 4px 2px",
          }}
        >
          <div
            className={
              "col d-flex align-items-center py-4 text-muted font-weight-bold"
            }
            style={{
              backgroundColor: "rgb(233, 233, 233)",
              // color: "white",
              borderRadius: "2px 2px 0 0",
            }}
          >
            {headerList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`text-center align-middle grid-item ${item.className}`}
                  style={item.style}
                >
                  {item.name === "row" ||
                  item.name === "delete" ||
                  item.isSort === false ? null : (
                    <i
                      style={{ cursor: "pointer" }}
                      className={`cursor-pointer ${
                        item.isAsc === true
                          ? "fas fa-sort-amount-up"
                          : "fas fa-sort-amount-down"
                      }`}
                      onClick={() => {
                        sort(item);
                      }}
                    ></i>
                  )}
                  &nbsp; &nbsp; {item.localization}
                  {/* <FormattedMessage
                    id={item.localization ? item.localization : " "}
                  /> */}
                </div>
              );
            })}
          </div>
          <div className="col p-0">{renderGridContent()}</div>
          <React.Fragment>{renderpagination()}</React.Fragment>
        </div>
      );
  };
  return renderHeader();
};
Grid.propTypes = {
  language: propTypes.object,
  contentGrid: propTypes.array,
  headerGrid: propTypes.array,
  onClick: propTypes.func,
  itemsCountPerPage: propTypes.number,
  activePage: propTypes.number,
  pagingClick: propTypes.func,
  totalItemsCount: propTypes.number,
};
Grid.defaultProps = {
  language: {},
  contentGrid: [],
  headerGrid: [],
  onClick: () => {
    console.log("You should call a function");
  },
  itemsCountPerPage: 10,
  activePage: 1,
  pagingClick: () => {
    console.log("You should call a function");
  },
  totalItemsCount: 0,
};
function mapStateToProps(state, props) {
  return {
    language: state.language,
    // notification: state.notification
  };
}
export default Grid;
