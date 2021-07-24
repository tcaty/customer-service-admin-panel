import DDPlanetService from '../services';

describe('DDPlanetService, GET requests:', () => {

  const ddPlanetService = new DDPlanetService();

  describe('getAllOrders', () => {

    describe('should return obj where orders has length which equal to take value', () => {

      for (let i = 0; i < 5; i++) {
        test(`take = ${i}`, () => {
          ddPlanetService.getAllOrders(0, i)
            .then(data => expect(data.orders.length).toBe(i))
            .catch(error => error);
        });
      }
    });
  
    describe('should return error when skip value is greater than orders count', () => {
  
      for (let i = 1000; i < 1005; i++) {
        test(`skip = ${i}`, () => {
          ddPlanetService.getAllOrders(i, 1)
            .then(data => data)
            .catch(error => expect(error).toBeDefined());
        })
      }
    })
  })

  describe('getOrderById', () => {

    const keys = ['orderId', 'firstName', 'lastName', 'middleName', 'userPhone', 'text'];

    describe(`should return obj with keys : [${keys}]`, () => {

      const idForTests = [97, 58, 43, 96, 72];

      for (let id of idForTests) {
        test(`id = ${id}`, () => {
          ddPlanetService.getOrderById(id)
          .then(order => expect(Object.keys(order)).toEqual(keys))
          .catch(error => error);
        })
      }
    })

    describe (`sholud return error when id is not correct`, () => {

      const idForTests = [false, true, '', -100, 'hello'];

      for (let id of idForTests) {
        it(`id = ${id}`, () => {
          ddPlanetService.getOrderById(id)
          .then(order => order)
          .catch(error => expect(error).toBeDefined());
        })
      }

    })
  })

});
