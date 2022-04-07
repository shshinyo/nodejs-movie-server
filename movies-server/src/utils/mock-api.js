const mockData = require("../../test/mockData.json");
const helperService = require("./helper.service");
async function simulateAsyncCall(request) {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      switch (request.method) {
        case "POST":
          switch (request.url) {
            case 'movies/add':
              const BasicToken = await helperService.basicToken();
              let user = await helperService.jwtDecoder(BasicToken);
              let { moviesExceedsForBasic } = mockData;
              if (moviesExceedsForBasic.filter(movie => movie.userId == user.userId).length >= 5) {
                resolve({ status: 405, body: { message: "Basic User Cant Add more than 5" } });
              } else {
                resolve({ status: 200, body: { message: 'Movie Created' } });
              }
              break;
            default:
              resolve({ status: 400, message: 'Bad Request' });
          }
      }

    }, 300);
  });
}
module.exports = { simulateAsyncCall }