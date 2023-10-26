import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const filter=(prop)=>{
    const {coursedata,set_coursedata}=prop
    const [selectedFilterValue, setSelectedFilterValue] = useState("");
    const terms=["Spring","Fall","Winter"]

    useEffect(() => {
        let filteredResults = [...coursedata];
        if (selectedFilterValue !== "none" && selectedFilterValue !== "") {
          filteredResults = filteredResults.filter(
            (x) => x.term == selectedFilterValue
          );
        }
        set_coursedata(filteredResults);
      }, [selectedFilterValue]);


    return (
        <Dropdown>
      <Dropdown.Toggle
        style={{background: 'linear-gradient(#007bff, #66d9ef)', border: 'none'}}
        id="dropdown-basic"
        size="md"
      >
        Filter by {selectedFilterValue == "none" ? "" : selectedFilterValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {terms.map((x) => (
          <Dropdown.Item key={x} onClick={() => setSelectedFilterValue(x)}>
            {x}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    )
}