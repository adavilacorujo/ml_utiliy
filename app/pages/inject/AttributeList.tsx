import { EuiLoadingContent, EuiSelectable, EuiSelectableOption } from "@elastic/eui";
import Error from "next/error";
import { useEffect, useState } from "react";
import { parseJSON }  from './parseJSON';


const handleFetcher = async({ index }) => {
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
    })
  })
  .then(response => response.json())
  .then(data => data)
  .catch((error) => {
    console.log("Error fetching Attribute list", error);
    return error
  })

  return data.hist.properties;
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


const AttributeList = ({ index, dataType, options, setOptions } : any) => {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleFetcher({ index })
        .then((data) => {
            let option = [];
            console.log(parseJSON(data));
              // Add option to options array
              setOptions([...parseJSON(data)]);
              setIsLoading(false);
        })
        
    }, [index]);

    let loading = (
      <EuiLoadingContent />
    );

    let list = (
      <EuiSelectable
            aria-label="Searchable example"
            searchable
            searchProps={{
                'data-test-subj': 'selectableSearchHere',
            }}
            options={options}
            onChange={(newOptions) => {
              setOptions(newOptions);
            }}
                        >
            {(list, search) => (
                <>
                {search}
                {list}
                </>
            )}
            </EuiSelectable>
    )

    return (
      <>
        {isLoading ? loading : list}
      </>
    )
    
}
export default AttributeList;