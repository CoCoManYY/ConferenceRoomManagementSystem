export const canReserveStatusMap = {
    0: "可预订",
    1: "可抢占",
    2: "使用中",
    3: "已预定",
    4: "已过期",
    5: "已到预定时间，请去个人中心打卡"
}


export const userStateMap={
    0:'未处理',
    1:"已接受",
    2:"已拒绝"
}

export const personalConferenceTypeMap = {
    1: {
      url: "http://localhost:9000/conferenceRoom/getConferenceReservedByMyself",
      params: { userId: localStorage.getItem("userId") }
    },
    2: {
      url: "http://localhost:9000/conferenceRoom/getConferenceRelatedToMyself",
      params: { userId: localStorage.getItem("userId"), status: 1 }
    },
    3: {
      url: "http://localhost:9000/conferenceRoom/getConferenceRelatedToMyself",
      params: { userId: localStorage.getItem("userId"), status: 0 }
    }
  };