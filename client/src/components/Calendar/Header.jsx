import React from "react";

function Header({ value, setValue }) {
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
      return value.isSame(new Date(), 'month')
  }

  return (
    <div className="calendar-header-container">

      <div onClick={() => setValue(prevMonth())} className="header-previous">
        {!thisMonth() ? String.fromCharCode(171) : null}
      </div>
      <div className="header-current">
        {currMonthName()} {currYear()}
      </div>
      <div onClick={() => setValue(nextMonth())} className="header-next">
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}

export default Header;
