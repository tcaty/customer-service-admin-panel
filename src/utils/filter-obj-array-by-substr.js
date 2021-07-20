const filterObjArrayBySubstr = (array, substr) => {

  return array.filter(item => {

    const values = Object.values(item);
    let flag = false;
    
    values.forEach(value => {
      if (typeof value !== typeof 1) {
        if (value.toLowerCase().includes(substr.toLowerCase())) {
          flag = true;
        }
      }
    })

    return flag;
  })
};

export default filterObjArrayBySubstr;