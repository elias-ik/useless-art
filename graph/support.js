//DON'T MODIFY THIS FILE

function genData1() {
  const dict = {};
  for (let i = 1; i <= 3; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = 0 + 100 * (i - 1);
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

function genData2() {
  const dict = {};
  for (let i = 1; i <= 10; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = 0 + 100 * (i - 1);
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

function genData3() {
  const dict = {};
  for (let i = 1; i <= 600; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = Math.round(50000 + 10000 * Math.sin(i * 0.1));
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

function genData4() {
  const dict = {};
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = Math.round(100 + 40 * Math.sin(i * 0.1));
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

function genData5() {
  const dict = {};
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = Math.round(100 + 40 * Math.sin(i * 0.1));
    if(i % 10 == 0) {
        dict[dateString] = 0;
    }
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

function genData6() {
  const dict = {};
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    const dateString = date.toISOString().split("T")[0] + "T00:00:00Z";
    dict[dateString] = Math.round(1000 + 1000 * Math.sin(i * 3.14/2));
  }
  var asJson = JSON.stringify(dict);
  console.log(asJson);
  return dict;
}

window.onload = function () {
  drawGraph("c1", genData1());
  drawGraph("c2", genData2());
  drawGraph("c3", genData3());
  drawGraph("c4", genData4());
  drawGraph("c5", genData5());
  drawGraph("c6", genData6());
};
