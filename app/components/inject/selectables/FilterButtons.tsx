import {
EuiButtonIcon,
    EuiFlexGroup,
EuiFlexItem,
} from '@elastic/eui';
import { useEffect, useState } from 'react';
import { Button } from './Button';

export const FilterButtons = ({filters, attributeList, setFilters}) => {
    const [buttons, setButtons] = useState([]);


    useEffect(() => {
        let button = [];
        filters.forEach(element => {
            if (element.active === true){
                let item = [
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false}>
                            <Button
                                label={element.filter.term}
                                filterList={filters}
                                setFilters={setFilters}
                            />
                        </EuiFlexItem>
                    </EuiFlexGroup>
                ]
                if (!buttons.includes(item)) {
                    button.push(item);
                }
            setButtons(button);
            }
            if (element.remove === true) {
                // Remove from array
                let temp = [];
                filters.forEach((value) => {

                    if (value != element) {
                        temp.push({
                            "active"  : value.active,
                            filter    : value.filter,
                            "remove"  : value.remove
                        });
                    }
                })
                setButtons(temp);
                setFilters(temp);
            }
        })
    }, [filters, attributeList])


return (
    <>
    <EuiFlexGroup>
        {buttons}
    </EuiFlexGroup>
    </>
)
};