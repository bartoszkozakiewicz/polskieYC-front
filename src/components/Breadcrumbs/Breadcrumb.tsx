'use client'

import React from "react";
import Link from "next/link";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface BreadcrumbProps {
  pageName: string;
  link?: string;
  conversionType?: ConversionType | '';
  setConversionType?: (value: ConversionType | '') => void;
}

enum ConversionType {
  AUTOFILL = 'AutoFill Document',
  GENERATE = 'Generate Document',
}

const Breadcrumb = ({ pageName, link, conversionType, setConversionType }: BreadcrumbProps) => {

  const handleChange = (event: SelectChangeEvent) => {
    if (setConversionType){
      setConversionType(event.target.value as ConversionType); 
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-row gap-6 items-center">
        <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
          {pageName}
        </h2>
        {conversionType &&
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Convertion Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={conversionType}
              label="Convertion Type"
              onChange={handleChange}
            >
              <MenuItem value={ConversionType.GENERATE}>{ConversionType.GENERATE}</MenuItem>
              <MenuItem value={ConversionType.AUTOFILL}>{ConversionType.AUTOFILL}</MenuItem>
            </Select>
          </FormControl>    
        }
      </div>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{link ? link : pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
