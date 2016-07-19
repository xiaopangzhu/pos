'use strict';

function printReceipt(tags){
  let items = buildItems(tags);
  let itemsSubtals = buildItemsSubtotal(items);
  let cartTotal = buildCartTotal(itemsSubtals);
  let receiptText = buildReceiptText(cartTotal);
  console.log(receiptText);
}

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

function buildItemsSubtotal(items){
  let itemsSubtotals = [];
  for (let item of items){
    let subtotal = item.item.price*item.count;
    let save = Math.floor(item.count/3)*item.item.price;
    itemsSubtotals.push({cartItem:item,subtotal:subtotal,save:save});
  }
  return itemsSubtotals;
}
