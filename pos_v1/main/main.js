'use strict';

function printReceipt(tags){
  let items = buildItems(tags);
  let cartItems = buildCartItems(items);
  let cart = buildCartTotal(cartItems);
  let receiptText = buildReceiptText(cart);
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

function buildCartItems(cartItems){
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode,loadPromotions());
    let {subtotal,save} = discount(cartItem,promotionType);
    return {cartItem,subtotal,save};
  });
}

function getPromotionType(barcode,promotions){
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : '';
}

function discount(cartItem,promotionType){
  let freeItemCount = promotionType === 'BUY_TWO_GET_ONE_FREE' ? parseInt(cartItem.count / 3) : 0;
  let save = freeItemCount * cartItem.item.price;
  let subtotal = cartItem.count * cartItem.item.price;
  return {subtotal,save};
}



