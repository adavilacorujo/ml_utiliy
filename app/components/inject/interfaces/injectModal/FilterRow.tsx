
import {
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiSelect,
  EuiButtonIcon,
  EuiFlexGroup,
  useGeneratedHtmlId,
  EuiToolTip,
} from '@elastic/eui';
import ComboBoxAttribute from './ComboBoxAttribute';
import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

export const FilterRow = ({index, dataType, options, filters, addFilter, operatorParam, toolTipContent, queryAPI}) => {
    const [value, setValue] = useState('');
    const [attribute, setAttribute] = useState([]);
    const [operator, setOperator] = useState(operatorParam[0].value);
    
    const [isDisabled, setDisabled] = useState(true);

    const onChange = e => {
        setOperator(e.target.value);
        addFilter({
            "attribute" : attribute[0].label,
            "operator"  : e.target.value,
            "options"   : value
        });
    };
    
    const onValueChange = e => {
        setValue(e.target.value);
        addFilter({
            "attribute" : attribute[0].label,
            "operator"  : operator,
            "options"   : e.target.value
        });
    }

    useEffect(() => {
        if (attribute.length > 0) {
            // Verify attribute has keyword
            if (attribute[0].value.includes('.keyword') && !operator.includes('THAN')) {
                setDisabled(false);
            }
            else setDisabled(true);
        }
        if (attribute.length < 1) setDisabled(true);

    }, [attribute, value, operator, options]);

    // const onClickCircle = () => {
    //     console.log("Filters", filters);
    //     addFilter(filters.concat(
    //         <>
    //         <EuiFlexGroup style={{ maxWidth: 900 }} id={`${uuidv4()}`}>
    //         <EuiFlexItem>
    //             <EuiFormRow label="Field">
    //                 <ComboBoxAttribute
    //                     index={index}
    //                     dataType={dataType}
    //                     selectedOptions={attribute}
    //                     setSelected={setAttribute}
    //                     singleSelector={{ asPlainText: true }}
    //                 />
    //             </EuiFormRow>
    //             </EuiFlexItem>
    //             <EuiFlexItem>
    //             <EuiFormRow label="Operator">
    //                 <EuiSelect 
    //                     id="select_operation"
    //                     options={operators}
    //                     value={operator}
    //                     onChange={e => onChange(e)}
    //                     aria-label='Select operation'
    //                 />
    //             </EuiFormRow>
    //             </EuiFlexItem>
    //             <EuiFlexItem>
    //             <EuiFormRow label="Value">
    //                 <EuiFieldText name="value" 
    //                     value={value}
    //                     onChange={e => onValueChange(e)}
    //                     disabled={isDisabled}
    //                 />            
    //             </EuiFormRow>
    //             </EuiFlexItem>
    //         </EuiFlexGroup>
    //         </>
    //     ));
    // }

    return (
        <>
        <EuiFlexGroup style={{ maxWidth: 900 }} id={`${uuidv4()}`}>
            <EuiFlexItem>
                <EuiFormRow label="Field">
                    <ComboBoxAttribute
                        index={index}
                        dataType={dataType}
                        selectedOptions={attribute}
                        setSelected={setAttribute}
                        singleSelector={{ asPlainText: true }}
                        queryAPI={queryAPI}
                        parentOptions={options}
                    />
                </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                <EuiFormRow label="Operator">
                    <EuiSelect 
                        id="select_operation"
                        options={operatorParam}
                        value={operator}
                        onChange={e => onChange(e)}
                        aria-label='Select operation'
                    />
                </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                <EuiFormRow label="Value">
                    <EuiToolTip position='top' content={toolTipContent}>
                        <EuiFieldText name="value" 
                            value={value}
                            onChange={e => onValueChange(e)}
                            disabled={isDisabled}
                        />       
                    </EuiToolTip>
                </EuiFormRow>
            </EuiFlexItem>
            {/* <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
                <EuiButtonIcon
                    onClick={onClickCircle}
                    iconType={"plusInCircle"}    
                />
            </EuiFormRow>
            </EuiFlexItem> */}
        </EuiFlexGroup>
        </>
    )
}