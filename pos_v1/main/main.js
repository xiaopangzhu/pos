'use strict';

function printReceipt(tags){
  let items = buildItems(tags);
  let cartItems = buildCartItems(items);
  let cart = buildCart(cartItems);
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
      isItem.count += count;
    }
    else{
      let item = allItems.find(allItems => allItems.barcode === barcode);
      items.push({item,count});
    }
  }
  return items;
}

function  buildCartItems(cartItems){
  return cartItems.map(cartItem => {
    let promotionType = getPromotiomType(cartItem.item.barcode,loadPromotions());
    let {subtotal,save} = discount(cartItem,promotionType);
    return {cartItem,subtotal,save};
  });
}

function getPromotiomType(barcode,promotions){
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : '';
}

function discount(cartItem,promotionType){
  let freeItemCount = promotionType === 'BUY_TWO_GET_ONE_FREE' ? parseInt(cartItem.count / 3) : 0;
  let save = freeItemCount * cartItem.item.price;
  let subtotal = cartItem.count * cartItem.item.price - save;
  return {subtotal,save};
}

function buildCart(cartItems){
  let total = 0;
  let saveTotal = 0;
  for (let cartItem of cartItems){
    total += cartItem.subtotal;
    saveTotal += cartItem.save;
  }
  return {cartItems,total,saveTotal};
}

function buildReceiptText(cart){
  return `***<没钱赚商店>收据***
${buildCartItemsText(cart.cartItems)}
----------------------
总计：${(cart.total).toFixed(2)}(元)
节省：${(cart.saveTotal).toFixed(2)}(元)
**********************`;
}

function buildCartItemsText(cartItems){
  return cartItems.map(cartItem => {
    return `名称：${cartItem.cartItem.item.name}，\
数量：${cartItem.cartItem.count}${cartItem.cartItem.item.unit}，\
单价：${(cartItem.cartItem.item.price).toFixed(2)}(元)，\
小计：${(cartItem.subtotal).toFixed(2)}(元)`;
  }).join('\n');
}




















