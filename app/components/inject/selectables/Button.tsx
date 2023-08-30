import React, { useState } from 'react';

import {
    EuiButton, EuiButtonGroup, EuiButtonIcon, useGeneratedHtmlId,
} from '@elastic/eui';


export const Button = ({label, filterList, setFilters}) => {

  const [toggle0On, setToggle0On] = useState(true);

  let key, value;

  const keyValue = (input) => Object.entries(input).forEach(([k,v]) => {
    if (k.includes('keyword')) {
      k = k.replace('.keyword', '');
    }
    key   = k;
    value = v;
    
  })
  
  const toggleHandler = (isOn : boolean) => {
    if (isOn) {
      // Remove from list of active filters
      let tempList = [];
      filterList.forEach((element) => {
        let active : boolean;

        if (element.filter.term === label) {
          active = false;
        }

        tempList.push({
          "active"  : active,
          filter    : element.filter,
          "remove"  : element.remove
        });
      })
      setFilters(tempList);
    }

    if (!isOn) {
      // Add to list of active filters
      let tempList = [];
      filterList.forEach((element) => {
        let active : boolean;

        if (element.filter.term === label) {
          active = true;
        }

        tempList.push({
          "active"  : active,
          filter    : element.filter,
          "remove"  : element.remove
        });
      })
      setFilters(tempList);
    }
  }

  const removeButton = () => {
      // Remove from list of active filters
      let tempList = [];
      filterList.forEach((element) => {
        let remove : boolean;

        if (element.filter.term === label) {
          remove = true;
        }
        tempList.push({
          "active"  : element.active,
          filter    : element.filter,
          "remove"  : remove
        });
      })
      setFilters(tempList);
  }

  keyValue(label);

  const multiSelectButtonGroupPrefix = useGeneratedHtmlId({
    prefix: "multiSelectButtonGroup"
  });

  const toggleButtonsMulti = [
    {
      id: `${multiSelectButtonGroupPrefix}__0`,
      label: `${key} : ${value}`
    },
    {
      id: `${multiSelectButtonGroupPrefix}__1`,
      label: "Remove"
    },
  ];
  
  const [toggleIdToSelectedMap, setToggleIdToSelectedMap] = useState({
    [`${multiSelectButtonGroupPrefix}__0`]: true
  });

  const onChangeMulti = (optionId) => {
    console.log("Options ID", optionId);
    // Verify which option is selected
    if (optionId === `${multiSelectButtonGroupPrefix}__0`) {
      // Option one is selected. Manage filter selection
      const newToggleIdToSelectedMap = {
        ...toggleIdToSelectedMap,
        ...{
          [optionId]: !toggleIdToSelectedMap[optionId]
        }
      };
      toggleHandler(toggleIdToSelectedMap[optionId]);
      setToggleIdToSelectedMap(newToggleIdToSelectedMap);
    }
    
    if (optionId === `${multiSelectButtonGroupPrefix}__1`) {
      // Remove the filter
      removeButton();
    }
  };


  return (
    <>
      <EuiButtonGroup
        legend="This is a primary group"
        options={toggleButtonsMulti}
        idToSelectedMap={toggleIdToSelectedMap}
        onChange={(id) => onChangeMulti(id)}
        color="primary"
        type="multi"
      />
    </>
  );
};