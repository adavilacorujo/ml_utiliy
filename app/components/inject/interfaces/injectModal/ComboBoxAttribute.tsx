import { EuiComboBox, EuiLoadingContent, EuiSelectable, EuiSelectableOption } from "@elastic/eui";
import Error from "next/error";
import { useEffect, useState } from "react";
import { parseJSON }  from '../../utils/parseJSON';


const handleFetcher = async({ index, dataType }) => {
  if (index === null) {
    throw Error
  }

  let data = await fetch('/api/attributes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index: index,
      dataType: dataType
    })
  })
  .then(response => response.json())
  .then(data => data.hist.properties)
  .catch((error) => {
    console.log("Error fetching Attribute list", error);
    return error
  })

  return data;
}

const flattenJSON = (obj = {}, res = {}, extraKey = '') => {
    const listNoInterest = ['fields', 'keyword', 'ignore_above', 'properties']
    for(let key in obj){
       if(typeof obj[key] !== 'object'){
          if (listNoInterest.includes(key)) {
                res[extraKey.slice(0, -1)] = obj[key];
          }
       }else{
          let extra;
          if (listNoInterest.includes(key)) {
            extra = `${extraKey}`
          }
          else {
            extra = `${extraKey}${key}.`
          }
          flattenJSON(obj[key], res, extra);
       };
    };
    return res;
 };


const AttributeList = ({ index, dataType, parentOptions, selectedOptions, setSelected, singleSelector, queryAPI } : any) => {

    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [inputRef, setInputRef] = useState(undefined);
    const [options, setOptions] = useState(parentOptions);


    const onChange = (selectedOptions) => {
        setSelected(selectedOptions);
        setError(undefined);
      };

    const onSearchChange = (value, hasMatchingOptions) => {
        setError(
          value.length === 0 || hasMatchingOptions
            ? undefined
            : `"${value}" is not a valid option`
        );
    };
    
    const onBlur = () => {
        if (inputRef) {
          const { value } = inputRef;
          setError(
            value.length === 0 ? undefined : `"${value}" is not a valid option`
          );
        }
    };

    useEffect(() => {
      if (queryAPI === true) {

        handleFetcher({ index , dataType})
        .then((data) => {
            // Add option to options array
            setOptions([...parseJSON(data)]);
            setIsLoading(false);
        })
      }
    }, [index]);

    useEffect(() => {
      setOptions(parentOptions);
    }, [parentOptions]);

    let loading = (
      <EuiLoadingContent />
    );

    let list = (
        <>
        <EuiComboBox
            aria-label="Accessible screen reader label"
            placeholder="Select one or more attributes"
            options={options}
            selectedOptions={selectedOptions}
            inputRef={setInputRef}
            onChange={onChange}
            onSearchChange={onSearchChange}
            onBlur={onBlur}
            singleSelection={singleSelector}
        />
        </>
    )

    return (
      <>
        {isLoading ? loading : list}
      </>
    )
    
}
export default AttributeList;