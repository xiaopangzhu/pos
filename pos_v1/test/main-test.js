'use strict';

describe('pos', () => {

  describe('items',()=>{
    it('should print one item',()=>{
      let inputs = [
        'ITEM000001'
      ];
      const expectItem = [
        {item:{barcode: 'ITEM000001',
               name:'雪碧',
               unit:'瓶',
               price:3.00},
         count:1
        }
      ];
      expect(buildItems(inputs)).toEqual(expectItem);
    });

    it('should print two items',()=>{
      let inputs = [
        'ITEM000001',
        'ITEM000001'
      ];
      const expectItem= [
        {item:{barcode: 'ITEM000001',
          name:'雪碧',
          unit:'瓶',
          price:3.00},
          count:2
        }
      ];
      expect(buildItems(inputs)).toEqual(expectItem);
    });

    it('should print item with -',()=>{
      let inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-3'
      ];
      const expectItem = [
        {item:{barcode: 'ITEM000001',
          name:'雪碧',
          unit:'瓶',
          price:3.00},
          count:2
        },
        {item:{barcode: 'ITEM000003',
          name:'荔枝',
          unit:'斤',
          price:15.00},
          count:3
        }
      ];
      expect(buildItems(inputs)).toEqual(expectItem);
    });
  });

  

  let inputs;
beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

  spyOn(console, 'log');

  printReceipt(inputs);

  const expectText = `***<没钱赚商店>收据***
  名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
  名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
  名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
  ----------------------
  总计：51.00(元)
  节省：7.50(元)
  **********************`;

  expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
