import DDPlanetService from '../services';

const ddPlanetService = new DDPlanetService();

describe('DDPlanetService', () => {

  it('_transformUserPhone should correctly transform user phone', () => {

      const userPhone = '+7 (915) 0938745';
      const expectedUserPhone = '+7 (915) 093-87-45';

      const transformedUserPhone = ddPlanetService._transformUserPhone(userPhone);

      expect(transformedUserPhone).toBe(expectedUserPhone);
  });

  it('_trasformAllUserPhones should correctly transform all user phones in objs', () => {
    
    const data = [
      { name: 'hello', userPhone: '+7 (914) 3091212' },
      { name: 'world', userPhone: '+7 (913) 8907632' }
    ];

    const expectedData = [
      { name: 'hello', userPhone: '+7 (914) 309-12-12' },
      { name: 'world', userPhone: '+7 (913) 890-76-32' }
    ];

    const transformedData = ddPlanetService._trasformAllUserPhones(data);

    expect(transformedData).toEqual(expectedData);
  });

  it('_sortSettingsByField should correctly sort array of objs by field', () => {
    
    const data = [
      { name: 'dsad', lastName: 'Петров' },
      { name: 'hello', lastName: 'Иванов' },
      { name: 'www', lastName: 'Сидоров' }
    ];

    const expectedData = [
      { name: 'hello', lastName: 'Иванов' },
      { name: 'dsad', lastName: 'Петров' },
      { name: 'www', lastName: 'Сидоров' }
    ];

    const sortedData = data.sort(ddPlanetService._sortSettingsByField('lastName'));

    expect(sortedData).toEqual(expectedData);
  });

  it('_transformOrder should return order with only nedeed fields', () => {

    const order = {
      orderId: 12,
      firstName: 'John',
      age: 38,
      lastName: 'Fox',
      middleName: '',
      userPhone: '+7 (913) 890-76-32',
      text: 'hello hello hello hello hello hello',
      city: 'London',
      color: 'red'
    };

    const expectedOrder = {
      orderId: 12,
      firstName: 'John',
      lastName: 'Fox',
      middleName: '',
      userPhone: '+7 (913) 890-76-32',
      text: 'hello hello hello hello hello hello'
    };

    const transformedOrder = ddPlanetService._transformOrder(order);

    expect(transformedOrder).toEqual(expectedOrder);
  });

  it('_transformAllOrders should correctly transform orders', () => {
    
    const orders = [
      { orderId: 11, firstName: 'dsa', lastName: 'dstt', middleName: '',  userPhone: '+7 (914) 3091212', text: 'dsadsaodoa'},
      { orderId: 43, firstName: 'gd', lastName: 'bbE', middleName: '',  userPhone: '+7 (914) 3094442', text: 'f23ffFSA', _id: 'dskaldskal'},
      { orderId: 434, firstName: 'f', lastName: 'OK', middleName: '',  userPhone: '+7 (914) 3091212', text: 'dsadFDsaodoa', age: 19},
    ];

    const expectedOrders = [
      { orderId: 43, firstName: 'gd', lastName: 'bbE', middleName: '',  userPhone: '+7 (914) 309-44-42', text: 'f23ffFSA' },
      { orderId: 11, firstName: 'dsa', lastName: 'dstt', middleName: '',  userPhone: '+7 (914) 309-12-12', text: 'dsadsaodoa'},
      { orderId: 434, firstName: 'f', lastName: 'OK', middleName: '',  userPhone: '+7 (914) 309-12-12', text: 'dsadFDsaodoa'},
    ];

    const transformedOrders = ddPlanetService._transformAllOrders(orders);

    expect(transformedOrders).toEqual(expectedOrders);
  });

  it('should correctly transform oreder for creating', () => {

    const order = {
      firstName: 'Hello',
      lastName: 'World',
      userPhone: '+79150981245',
      text: 'dklsldllllds;ad',
      withoutMiddleName: true
    };

    const expectedOrder = {
      firstName: 'Hello',
      middleName: '',
      lastName: 'World',
      userPhone: '+79150981245',
      text: 'dklsldllllds;ad',
      withoutMiddleName: true
    };

    const transformedOrder = ddPlanetService._transformOrderForCreating(order);

    expect(transformedOrder).toEqual(expectedOrder);
  })
});
