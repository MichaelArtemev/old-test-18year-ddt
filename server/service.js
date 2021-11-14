const axios = require("axios");
const faker = require("faker");

export const generateMock = () => {
  const employees = [];
  for (var id = 0; id < 50; id++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const secondName = faker.name.lastName();
    const phone = faker.phone.phoneNumber('0165#######')
    const tNumber = faker.random.number();
    employees.push({
      id: id,
      first_name: firstName,
      last_name: lastName,
      second_name: secondName,
      phone: phone,
      tnumber: tNumber,
    });
  }
  return console.log(JSON.stringify({employ: employees}));  
};

// решил полностью удалить функционал с редактированием json. не успеваю по времени
export const getWorkersService = (startPosition, endPosition) => {
  const promise = axios.get(`http://localhost:3000/employ?_start=${startPosition}&_end=${endPosition}`);
  return promise.then((obj) => {
    return obj.data;
  });
};
