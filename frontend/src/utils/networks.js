import history from "../components/common/history";
//根据参数名获取对应的url参数
export const  getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }


export const myFetch = (url = "", method = "get", params = {}) => {

  console.log('getData',url,method,params);
  //请求URL
  // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
  let apiUrl = url + "?";
  //设置请求方式，请求头和请求内容
  var opts = {
    // credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authorizationToken")
    }
  };

  if (method == "post") {
    opts.body = JSON.stringify(params);
  } else {
    const paramString =  Object.keys(params)
      .map(key => {
        return `${key}=${params[key]}`;
      })
      .join("&");
      apiUrl += paramString;
    
  }
  //成功发送请求
  return fetch(apiUrl, opts).then(response=>{
       if (response.status !== 200) {
        if (response.status === 401) {
          history.push("/login");
        }
        throw new Error(
          "Fail to get response with status " + response.status
        );
      }
      return response.json()
  });
};