export const parseJSON
 = (data) => {
    var flatten = require('flat');
    var optionList = [];
    var options = [];
    var keywords = [];
    for (let element in flatten(data)) {

        let replaced = element.replaceAll('.properties.', '.')
        replaced = replaced.replaceAll('.fields.', '.')
        replaced = replaced.replaceAll('.type', '')
        replaced = replaced.replaceAll('.type', '')
        replaced = replaced.replaceAll('.ignore_above', '')
        
        let value = replaced
        let label = replaced.replaceAll('.keyword', '');

        if (value.includes('.keyword')) {
            if (keywords.includes(label)) {
                continue;
            }
            else {
                keywords.push(label);
            }
        }
        if (options.some(e => e.label == label)) {
            continue
        }
        else {
            options.push({
                label : label,
                value : value
                });
        }
    }
    
    options.forEach(({label, value}) => {
        if (keywords.includes(label)) {
            optionList.push({
                label: label,
                value: label + '.keyword'
            });
        } else {
            optionList.push({
                label: label,
                value: label
            })
        }
    })
    return optionList;
 };