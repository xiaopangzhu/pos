'use strict';

function buildItems(tags){
  let items = [];
  let allItems = loadAllItems();
  for(let tag of tags){
    let splittedtag = tag.split('-');
    let barcode = splittedtag[0];
    let count = parseFloat(splittedtag[1] || 1);
    let isItem = items.find(items => items.item.barcode === barcode);
    if (isItem){
      isItem.count++;
    }
    else{
      let item = allItems.find(allItems => allItems.barcode === barcode);
      items.push({item:item,count:count});
    }
  }
  return items;
}
