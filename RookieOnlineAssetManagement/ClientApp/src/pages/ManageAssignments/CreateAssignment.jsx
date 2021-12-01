import React, { useState, useEffect } from "react";
import SelectUsers from "./SelectUsers";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

function CreateAssignment(props) {
  const [isOpenSelectUsers, setIsOpenSelectUsers] = useState(false);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  return (
    <div style={{ padding: "50px", width: '600px' }}>
      <div
        style={{
          color: "#dc3545",
          fontSize: "25px",
          fontWeight: "bold",
          marginBottom: "25px",
        }}
      >
        Create New Assignment
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '450px' }}>
        <div style={{ marginRight: '115px' }}>User</div>
        <InputGroup style={{ width: "300px" }}>
            <FormControl
              type="search"
              placeholder=""
              value={label}
              onClick={() => setIsOpenSelectUsers(true)}
              style={{ borderRight: '0px', backgroundColor: '#FFF' }}
              readOnly
            />
            <InputGroup.Text style={{ backgroundColor: '#FFF' }}>
              <BsSearch
                style={{ color: "#000", marginBottom: "3px" }}
              />
            </InputGroup.Text>
        </InputGroup>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '450px', marginTop: '20px' }}>
        <div style={{ marginRight: '110px' }}>Asset</div>
        <InputGroup style={{ width: "300px" }}>
            <FormControl
              type="search"
              placeholder=""
              value=""
              onClick={() => {}}
              style={{ borderRight: '0px', backgroundColor: '#FFF' }}
              readOnly
            />
            <InputGroup.Text style={{ backgroundColor: '#FFF' }}>
              <BsSearch
                style={{ color: "#000", marginBottom: "3px" }}
              />
            </InputGroup.Text>
        </InputGroup>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '450px', marginTop: '20px' }}>
        <div style={{ marginRight: '45px' }}>Assigned Date</div>
        <InputGroup style={{ width: "300px", borderRight: '1px solid #ced4da', borderRadius: '.25rem' }}>
            <FormControl
              type="date"
              placeholder=""
              onClick={() => {}}
              style={{ borderRight: '0px', backgroundColor: '#FFF' }}
            />
        </InputGroup>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '450px', marginTop: '20px' }}>
        <div style={{ marginRight: '45px' }}>Note</div>
        <textarea  style={{ width: "300px", height: '80px', borderColor: '#ced4da' }}>

        </textarea >
      </div>

      <div style={{ display: "flex", justifyContent: "end", marginTop: '30px', marginRight: '50px' }}>
        <Button
          style={{
            backgroundColor: "#dc3545",
            border: "1px solid #dc3545",
            borderRadius: "4px",
            marginRight: "20px",
          }}
          onClick={() => {}}
        >
          Save
        </Button>
        <Button
          style={{
            backgroundColor: "#FFF",
            border: "1px solid #808080",
            borderRadius: "4px",
            color: "#808080",
          }}
          onClick={() => {}}
        >
          Cancel
        </Button>
      </div>

      {isOpenSelectUsers ? 
        <SelectUsers
          isOpenSelectUsers={isOpenSelectUsers}
          setIsOpenSelectUsers={setIsOpenSelectUsers}
          setValue={setValue}
          setLabel={setLabel}
        /> : ""
      }
    </div>
  );
}

export default CreateAssignment;
