import React from "react";
import "./SimpleTable.css";
import Label from "./Label";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import {ColumnDef} from "./MyTables.tsx";

interface SimpleTableProps {
  columnDefs: ColumnDef[];
  data: Record<string, any>[];
  handleEditClick: (row: any) => void;
  handleViewClick: (row: any) => void;
  handleDeleteClick: (row: any) => void;
}

const decisionColumns = ["manager_decision", "other_decision_column"];

const SimpleTable: React.FC<SimpleTableProps> = ({
                                                   columnDefs,
                                                   data,
                                                   handleEditClick,
                                                   handleViewClick,
                                                   handleDeleteClick
}) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
        <tr>
          {columnDefs.map((column, index) => {
            if (!column.isVisible) return null;
            return <th key={index}>{column.headerName}</th>;
          })}
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnDefs.map((column, colIndex) => (
                column.isVisible && <td key={colIndex} data-title={column.headerName}>
                  {decisionColumns.includes(column.field) ? (
                    <Label decision={row[column.field]} />
                  ) : (
                    row[column.field] ?? ''
                  )}
                </td>
              ))}
              <td>
                <button className="p-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewClick(row)}
                >
                  <FaEye />
                </button>
                <button className="p-1 text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEditClick(row)}
                >
                  <FaEdit />
                </button>
                <button className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(row)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
