'use strict';
function printReceipt(inputs){
  let items = buildItems(inputs);
}

function buildItems(inputs){
  let result = [];
  let allItems = loadAllItems();
  for(let input of inputs){
    let splitInput = input.split('-');
    let barcode = splitInput[0];
    let count = parseFloat(splitInput[1] || 1);
    const isItem = result.find((result) => {return result.item.barcode === barcode});
    if (isItem){
      isItem.count++;
    }
    else{
      let item = allItems.find(allItems => allItems.barcode === barcode);
      result.push({item:item,count:count});
    }
  };
  return result;
}



