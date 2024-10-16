import React from 'react';
import {makeStyles} from "tss-react/mui";


const useStyles = makeStyles()({
  selectZone: {// Ensure consistent padding with chipZone
    width: "max-content",
    display: 'flex',
    alignItems: 'center',
    marginTop: 12,
    // marginLeft: -20,
  },
  selectLabel: {
    fontWeight: 200,
    marginRight: 5,
    color: '#998',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
});
interface RowSelectProps {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
}

const RowSelect: React.FC<RowSelectProps> = ({ size, setSize }) => {
  const { classes } = useStyles()
  const options = [10, 25, 100];

  return (
    <div className={classes.selectZone}>
      <label htmlFor="rows-select" className={classes.selectLabel}>
        Rows:
      </label>
      <select
        id="rows-select"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className="border rounded-lg px-1 py-1 text-black bg-white dark:text-white dark:bg-gray-700"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RowSelect;
