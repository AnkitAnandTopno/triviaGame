import axios from "axios";
import _ from "lodash";

const server = "https://opentdb.com/api.php";
const sendRequest = data => {
  const thenFn = (data.success && data.success.fn) || (() => {});
  const errorFn = (data.error && data.error.fn) || (() => {});

  const param = _.omit(data, ["success", "error"]);
  const params = new URLSearchParams();
  let keyParamArray = _.keys(param);
  let tail = "?";
  for (let i = 0; i < keyParamArray.length; i++) {
    params.append(keyParamArray[i], "" + param[keyParamArray[i]]);
    tail += `${keyParamArray[i]}=${param[keyParamArray[i]]}&`;
  }

  axios({
    method: "get",
    url: server + tail
  }).then(response => {
    if (response.status === 200) {
      try {
        thenFn(JSON.parse(response.data));
      } catch (e) {
        thenFn(response.data);
      }
    } else {
      errorFn();
    }
  });
};
const htmlDecode = input => {
  var e = document.createElement("textarea");
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};
export { sendRequest, htmlDecode };
