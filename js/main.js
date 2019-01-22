function getRequest (url) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this.statusText);
      }
    };
    request.onerror = function () {
      reject(this.statusText);
    };
    request.send();
  });
}

document.querySelector('button').addEventListener('click', function () {
  let promise = getRequest('data/tasks.json');
  promise.then(function (tasks) {
    console.log(tasks);
    return getRequest('data/friends.json');
  }).then(function (friends) {
    console.log(friends);
    return getRequest('data/skills.json');
  }).then(function (skills) {
    console.log(skills);
  }).catch(function (err) {
    console.log(err);
  });
});