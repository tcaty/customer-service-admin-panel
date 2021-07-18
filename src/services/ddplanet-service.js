
export default class DDPlanetService {

  _transformUserPhone = (userPhone) => {
    return userPhone.slice(0, 2) + ' (' + userPhone.slice(2, 5) + ') ' + userPhone.slice(5, 8) + '-' + userPhone.slice(8, 10) + '-' + userPhone.slice(10) ;
  };

  _trasformAllUserPhones = (orders) => {
    return orders.map(order => ({
        ...order,
        userPhone: this._transformUserPhone(order.userPhone)
    }));
  };

  _sortSettingsByField = (fieldName) => (currentOrder, prevOrder) => {
    return currentOrder[fieldName].toLowerCase() > prevOrder[fieldName].toLowerCase() ? 1 : -1;
  };

  getAllOrders = async (skip, take) => {
    const url = `/orders/getAllOrders/${skip}/${take}/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    const data = await res.json();

    data.orders.sort(this._sortSettingsByField('lastName'))

    return {
      ...data,
      orders: this._trasformAllUserPhones(data.orders)
    };
  };

  _transformOrder = (order) => {
    const { withoutMiddleName = false, middleName = '' } = order;
    return {
      ...order,
      withoutMiddleName,
      middleName: withoutMiddleName && middleName !== '' ? '' : middleName,
    };
  };

  createOrder = async (order) => {
    const url = '/orders/createOrder';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this._transformOrder(order))
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  };

  getOrderById = async (orderId) => {
    const url = `/orders/getOrderById/${orderId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  };

  deleteOrder = async (orderId) => {
    const url = `/orders/deleteOrder/${orderId}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  }
}
