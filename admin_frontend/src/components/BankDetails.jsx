import React from "react";
import { ListGroup } from "react-bootstrap";
function BankDetails({
  accountNumber,
  ifscCode,
  bankName,
  branchName,
  accountHolderName,
}) {
  return (
    <ListGroup.Item>
      <strong>Bank Details:</strong>
      <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
        <div>
          <div>
            <strong>IFSC:</strong>
            {ifscCode}
          </div>
          <strong>Holder's Name:</strong>
          {accountHolderName}
        </div>
        <div>
          <strong>Account No:</strong>
          {accountNumber}
        </div>
        <div>
          <strong>Bank Name:</strong>
          {bankName}
        </div>
        <div>
          <strong>Branch:</strong>
          {branchName}
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default BankDetails;
