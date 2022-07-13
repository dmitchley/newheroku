// eslint-disable-next-line no-undef
request = request("http://localhost:8080");

// eslint-disable-next-line no-undef
request.get("/").expect(200, function (err) {
  console.log(err);
});
